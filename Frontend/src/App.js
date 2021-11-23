import Plot from './Component/Plot'
import Clock from './Component/Clock'
import Login from './Component/Login'
import Register from './Component/Register'
import React from 'react';

import './index.css'
import './text.css'

class App extends React.Component {
  
  render = () => {
    return (
    <>
    <html className =  "grey" style={{ 
            backgroundColor: 'grey'
          }}> 
    <body >
    <div style={{ textAlign:'right',
                  marginTop: 15,
                  marginRight: 15, 
          }}>
      
    <Login />
      &nbsp;
    <Register />
    <Clock className="grey"/> 
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
      </body>
      </html>
    </>
      );
  }   
  
}

export default App;
