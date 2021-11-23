import React from 'react';
import {Button} from 'antd';
import { Line } from '@ant-design/charts';
import { ContinuousLegend } from '@antv/g2/lib/dependents';


var data = [];
var timer1 = 0;
var entry = {};
var res = {};
var counter = 10; // To update the graph every 10 seconds

// Main Plot configuration
const config = {
  data,
  xField: 'TimeStamp',
  yField: 'Rate',
  label: {
    style: {
      fill: '#aaa',
    },
  },
  point: {
    size: 1,
    shape: 'dot',
  },
};

// Communicate with particle Photon
const fetchData = () => {
  // David https://api.particle.io/v1/devices/440048000d51353532343635/output1?access_token=5337556d927166dd61f24a448628ab25b487250d
  // Siyuan https://api.particle.io/v1/devices/2d004e000d51353532343635/analogvalue?access_token=4ec91795c48fcb469901a8c61e670f4d75ec5cce
  return fetch("https://api.particle.io/v1/devices/440048000d51353532343635/output1?access_token=5337556d927166dd61f24a448628ab25b487250d")
        .then((response) => response.json())
        .then((data) => res = data)
        .then(console.log(res));}

// Main Module 
class Plot extends React.Component {
  constructor() {
    super();
    this.state = {
        date: new Date(),
        isToggleOn: true
    }
}
handleClick = () => {
  this.setState(state => ({
    isToggleOn: !state.isToggleOn
  }));
}

componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        // time interval in millis;
        999
    );
}

componentWillUnmount() {
    clearInterval(this.timerID);
}

tick() {
  fetchData();
  // let resR = Math.floor(Math.random() * (17 - 8) + 8);
  let resR = res.result;
  console.log(counter);
  if (this.state.isToggleOn == true){
    if(res.ok == false){ // Connected, but not reading
      document.getElementById("resRate").innerHTML = "Photon error || " + res.error ;
      document.getElementById("resRate").className = "resRate_red";
      counter = 10;
    }  else if (resR == 0){  // Connected, Measring 
      document.getElementById("resRate").innerHTML = "Measuring";
      document.getElementById("resRate").className = "resRate_green";
      counter = 10;
    } else if (resR < 6 || resR > 60){  // Bad result 
      console.log(resR);
      document.getElementById("resRate").innerHTML = "Check Epidermal Device (Strain Gauge)"; // Please check adhesive (maybe loose)
      document.getElementById("resRate").className = "resRate_red";
      counter = 10;
    } else if (resR >= 6 && resR <= 60){ // In normal range
      if (counter == 10){
      entry = {TimeStamp: timer1, Rate: Math.round(resR)};
      timer1 = timer1 + 1;
      data.push(entry)
      document.getElementById("resRate").innerHTML = Math.round(resR);
      document.getElementById("resRate").className = "resRate_black";
      counter = 0;
      }
      counter++;
    } else if (res.error == "Timed out." ){ 
      document.getElementById("resRate").innerHTML = "Cannot connect to Particle Cloud";
      document.getElementById("resRate").className = "resRate_red";
      counter = 10;
    } else {
      document.getElementById("resRate").innerHTML = "Cannot connection with Photon";
      document.getElementById("resRate").className = "resRate_red";
      counter = 10;
    }
    
  } else if (this.state.isToggleOn == false) {
    entry = {TimeStamp: timer1, Rate: 0}
    data.push(entry)
    document.getElementById("resRate").innerHTML = "Disconnected";
    counter = 10;
  }
    this.setState({
        date: new Date()
    })
}
      render = () => {
        if (this.state.isToggleOn == true){
          return (
          <>
          <Button id = "toggle" style= {{textAlign:'center'}} type = 'primary' onClick={this.handleClick}>
                  {this.state.isToggleOn ? 'ON' : 'OFF'}
          </Button>
          <br></br>
          <Line {...config} />
          <br></br>
          </>);
        } else if (this.state.isToggleOn == false){
          document.getElementById("resRate").innerHTML = "Disconnected";
          // data = [];
          return (
          <>
          
          <Button id = "toggle" style= {{textAlign:'center'}} type = 'secondary' onClick={this.handleClick}>
                  {this.state.isToggleOn ? 'ON' : 'OFF'}
          </Button> 
          <br></br>
          <Line {...config} />
          <br></br>
          
          </>);
        }
        
      }
       
};



export default Plot;