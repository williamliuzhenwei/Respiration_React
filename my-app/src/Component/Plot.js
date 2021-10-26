import React from 'react';
import {Button} from 'antd';
import { Line } from '@ant-design/charts';



//try microphone example
var data = [];
var timer1 = 0;
var entry = {};
var res = {};
// for (var i = 0; i < data.length; i++){
    // data[i].TimeStamp = data[i].TimeStamp - +1.726925E+04;
    // data[i].Resistance = parseFloat(data[i].Resistance, 10);
    // data[i].Resistance -= 700;
// }
// Toggle = new Toggle;

const config = {
  data,

  xField: 'TimeStamp',
  yField: 'Rate',
  label: {
    style: {
      fill: '#aaa',
    },
  },
  // smooth: true,
  // autoFit: true,
  // yDim: {
  //   min: 700,
  //   max: 800
  // },
  point: {
    size: 1,
    shape: 'dot',
  },
};

const fetchData = () => {
  
  return fetch("https://api.particle.io/v1/devices/2d004e000d51353532343635/analogvalue?access_token=4ec91795c48fcb469901a8c61e670f4d75ec5cce")
        .then((response) => response.json())
        .then((data) => res = data)
        .then(console.log(res));}

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
    //res.result substiture 
    let rate = Math.floor(Math.random() * (17 - 8) + 8);
    entry = {TimeStamp: timer1, Rate: res.result};
    timer1 = timer1 + 1;
  if (this.state.isToggleOn == true){
    data.push(entry)
    if (rate > 14){
      document.getElementById("resRate").innerHTML = res.result;
      document.getElementById("resRate").className = "resRate_black";
    } else if (rate <= 14 && rate > 11){
      document.getElementById("resRate").innerHTML = res.result;
      document.getElementById("resRate").className = "resRate_black";
    } else if (rate <= 11){
      document.getElementById("resRate").innerHTML = res.result;
      document.getElementById("resRate").className = "resRate_black";
    } else if (rate <= 0 || rate == "undefined"){
      document.getElementById("resRate").innerHTML = "Don't hold your breath!";
      document.getElementById("resRate").className = "resRate_red";
    } 
    
  } else if (this.state.isToggleOn == false) {
    timer1 = timer1 - 1;
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
          <h2>Respiration Rate</h2>
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
          <h2>Respiration Rate</h2>
          </>);
        }
        
      }
       
};



export default Plot;