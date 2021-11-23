#include "photon_fft.h"
#include "dma.h"
#include <math.h>

const int FILTER_SIZE = 512; // 32 sec data each second 16 sample;

int sum_100 = 0;
int counter = 0;
double downsample[FILTER_SIZE];

// fft variable
const int L = FILTER_SIZE;
double Leng = double(FILTER_SIZE);
double Fs = 16.0;
double T = 1/Fs;
double t[FILTER_SIZE];
double P2[FILTER_SIZE];
double P1[FILTER_SIZE/2 + 1];
double f[FILTER_SIZE/2];

double hold_a = 0;
double hold_b = 0;
double hold_ab = 0;

double output1 = 0;
double max_num = 0;

std::vector<double> a;
std::vector<double> b;
std::vector<double> c;

void setup() {
    // Setup
	Serial.begin(9600);
	adcDMA.start(SAMPLE_RATE);
	
	// Setup for push to cloud
	Particle.variable("respiration", output1);
}

void loop() {
    Fft call_fft;
    b.clear();
    
    for (int k = 0; k < FILTER_SIZE; k++){
        b.push_back(0.0);
    }
    
    // DMA
	uint16_t *sendBuf = NULL;
	if (DMA_GetFlagStatus(DMA2_Stream0, DMA_FLAG_HTIF0)) {
	    DMA_ClearFlag(DMA2_Stream0, DMA_FLAG_HTIF0);
	    sendBuf = samples;
	}
	if (DMA_GetFlagStatus(DMA2_Stream0, DMA_FLAG_TCIF0)) {
	    DMA_ClearFlag(DMA2_Stream0, DMA_FLAG_TCIF0);
	    sendBuf = &samples[SAMPLE_BUF_SIZE/2];
	}
	
	// Collect data
	if (sendBuf != NULL) {
	    // Sum all 128 elements
		for(size_t ii = 0; ii < SAMPLE_BUF_SIZE/2; ii += 2) {
			uint32_t sum = (uint32_t)sendBuf[ii] + (uint32_t)sendBuf[ii + 1];
			counter++;
			sum_100 += (sum / 2);
        }
        // average them
        if (counter >= 128){
            double filter_sum_100 = sum_100/128.0;
            
            Serial.println(filter_sum_100);
            // Serial.print(" ");
            
            a.push_back(filter_sum_100);
            sum_100 = 0;
            counter = 0;
        }
        if (a.size() == FILTER_SIZE){
            c = a;
            // fft transform
            call_fft.transformRadix2(a, b);
            
            // remove the image part
            for (int i = 0; i < L; i++){
                t[i] = i * T;
            }
            for (int i = 0; i < L; i++){
                hold_a = a[i]/Leng;
                hold_b = b[i]/Leng;
                hold_ab = hold_a*hold_a + hold_b*hold_b;
                P2[i] = sqrt(hold_ab);
            }
            for (int i = 1; i < L/2 + 2; i++){
                P1[i] = P2[i];
            }
            for (int i = 2; i < L/2; i++){
                P1[i] = 2*P1[i];
            }
            for (int i =0; i < L/2 + 1; i++){
                f[i] = Fs * i /L;
            }
            
            // Find max peak and that is rasp rate
            max_num = P1[0];
            for (int i = 1; i < L/2 + 1; i++){
                if (P1[i] > max_num){
                    max_num = P1[i];
                    output1 = f[i];
                }
            }
            
            // Cal how many in heart beat in 1 min
            output1 *= 60;
            
            // push 2 cloud
            Particle.variable("respiration", output1);
            
            Serial.print("respiration ");
            Serial.println(output1, 4);
            
            // Re-index the final counter && sliding window
            for (int x = 0; x < 160; x++){
                c.erase(c.begin());
            }
            a = c;
            c.clear();
        }
	}
}