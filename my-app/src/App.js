import logo from './logo.svg';
import Plot from './Component/Plot'
import Clock from './Component/Clock'
import Login from './Component/Login'
import Register from './Component/Register'
import React from 'react';

import './index.css'

class App extends React.Component {

  render = () => {
    return (
    <>
    <div style={{ textAlign:'right', marginTop: 15, marginRight: 15}}>
      
    <Login />
      &nbsp;
    <Register />
    <Clock /> 
      </div>
    <div>
      <h1 style= {{textAlign : 'center'}}>Respiration rate chart</h1>

    </div>
    <Plot />
    <div>
      <h1 style = {{textAlign: 'center'}}>
        The Respiration rate is
        </h1>
      </div>
    </>
      );
  }   
  
}

export default App;
