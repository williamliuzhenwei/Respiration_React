import React from 'react';
import { Line } from '@ant-design/charts';
import Toggle from './Toggle';



//try microphone example
var data = [];
var timer1 = 0;
var entry = {};

// for (var i = 0; i < data.length; i++){
    // data[i].TimeStamp = data[i].TimeStamp - +1.726925E+04;
    // data[i].Resistance = parseFloat(data[i].Resistance, 10);
    // data[i].Resistance -= 700;
// }

const config = {
  data,
  height: 600,
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
        date: new Date()
    }
}

componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        2000
    );
}

componentWillUnmount() {
    clearInterval(this.timerID);
}

tick() {
    let rate = Math.floor(Math.random() * (16 - 12) + 12);
    entry = {TimeStamp: timer1, Rate: rate};
    timer1 = timer1 + 10;
    data.push(entry)
    this.setState({
        date: new Date()
    })
}
      render = () => {
        // if (Toggle.state.isToggleOn == true){
          return <Line {...config} />;
        // } else if (Toggle.state.isToggleOn == false){
        //   data = [];
        // }
        
      }
       
};



export default Plot;