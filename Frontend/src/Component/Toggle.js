import {Button} from 'antd';
import React from 'react';

class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
    }
   
    handleClick = () => {
      this.setState(state => ({
        isToggleOn: !state.isToggleOn
      }));
    }
   
    render() {
        if (this.state.isToggleOn == true){
            return (
                <Button id = "toggle" style= {{}} type = 'primary' onClick={this.handleClick}>
                  {this.state.isToggleOn ? 'ON' : 'OFF'}
                </Button>
              );
        } else if (this.state.isToggleOn == false){
            return (
                <Button id = "toggle" style= {{}} type = 'secondary' onClick={this.handleClick}>
                  {this.state.isToggleOn ? 'ON' : 'OFF'}
                </Button>
              );
        }

      
    }
  }

export default Toggle