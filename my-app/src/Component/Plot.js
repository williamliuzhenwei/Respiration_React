import React from 'react';
import {Button} from 'antd';
import { Line } from '@ant-design/charts';



//try microphone example
var data = [];
var timer1 = 0;
var entry = {};

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
        10000
    );
}

componentWillUnmount() {
    clearInterval(this.timerID);
}

tick() {
    let rate = Math.floor(Math.random() * (16 - 12) + 12);
    entry = {TimeStamp: timer1, Rate: rate};
    timer1 = timer1 + 1;
  if (this.state.isToggleOn == true){
    data.push(entry)
    if (rate > 13){
      document.getElementById("resRate").innerHTML = rate;
      document.getElementById("resRate").className = "resRate_red";
    } else if (rate <= 13){
      document.getElementById("resRate").innerHTML = rate;
      document.getElementById("resRate").className = "resRate_black";
    }
    
  } else if (this.state.isToggleOn == false) {
    timer1 = timer1 - 1;
    entry = {TimeStamp: timer1, Rate: 0}
    data.push(entry)
    document.getElementById("resRate").innerHTML = 0;
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
          <Line {...config} />
          <br></br>
          <h2>Respiration Rate</h2>
          </>);
        } else if (this.state.isToggleOn == false){
          // data = [];
          return (
          <>
          
          <Button id = "toggle" style= {{textAlign:'center'}} type = 'secondary' onClick={this.handleClick}>
                  {this.state.isToggleOn ? 'ON' : 'OFF'}
          </Button> 
          <Line {...config} />
          <h2>Respiration Rate</h2>
          </>);
        }
        
      }
       
};



export default Plot;