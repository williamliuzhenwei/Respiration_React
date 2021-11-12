import React from 'react';
import {Button} from 'antd';
import { Line } from '@ant-design/charts';



//try microphone example
var data = [];
var timer1 = 0;
var entry = {};
var res = {};

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
  return fetch("https://api.particle.io/v1/devices/440048000d51353532343635/respiration?access_token=5337556d927166dd61f24a448628ab25b487250d")
        .then((response) => response.json())
        .then((data) => res = data)
        .then(console.log(res))
        .catch(error => {
          throw(error);
        });}

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
        1000
    );
}

componentWillUnmount() {
    clearInterval(this.timerID);
}

tick() {
    fetchData();
    // let resR = Math.floor(Math.random() * (17 - 8) + 8);
    let resR = res.result;
    
    
  
  if (this.state.isToggleOn == true){
    if (resR >= 6 && resR <= 60){
      entry = {TimeStamp: timer1, Rate: Math.round(resR)};
      timer1 = timer1 + 1;
      data.push(entry)
      document.getElementById("resRate").innerHTML = Math.round(resR);
      document.getElementById("resRate").className = "resRate_black";
    } else if (resR == 0){
      document.getElementById("resRate").innerHTML = "Measuring";
      document.getElementById("resRate").className = "resRate_green";
    }
    else if (resR < 6 || resR > 60){
      console.log(resR);
      document.getElementById("resRate").innerHTML = "Check Epidermal Device";
      document.getElementById("resRate").className = "resRate_red";
    } else { 
      document.getElementById("resRate").innerHTML = "Check Device";
      document.getElementById("resRate").className = "resRate_red";
    }
    
  } else if (this.state.isToggleOn == false) {
    entry = {TimeStamp: timer1, Rate: 0}
    data.push(entry)
    document.getElementById("resRate").innerHTML = "Disconnected";
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