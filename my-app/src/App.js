import logo from './logo.svg';
import Plot from './Component/Plot'
import Clock from './Component/Clock'
import Login from './Component/Login'
import Register from './Component/Register'
import React from 'react';
import Toggle from './Component/Toggle'

import './index.css'
import './text.css'

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
      <h1 style= {{textAlign : 'center'}}>Respiration rate chart &nbsp;&nbsp;
      {/* <Toggle /> */}
      </h1>
      
    </div>
    <div style= {{textAlign : 'center'}}>
    <Plot />
    </div>
  
    <div>
      <h1  id = "resRate" className = "resRate_red" style = {{textAlign: 'center', fontSize:50}}>
        </h1>

      </div>
    </>
      );
  }   
  
}

export default App;
