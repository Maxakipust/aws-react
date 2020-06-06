import React from 'react';
import logo from './logo.svg';

class App extends React.Component{

  componentDidMount(){
    fetch("https://88ilaxa0x8.execute-api.us-east-1.amazonaws.com/test/helloworld")
      .then((res)=>res.json())
      .then((response)=>{
        console.log(response);
      })
  }

  render() {
    reutrn (
      <div>
        <h1>It works</h1>
      </div>
    )
  }
}

export default App;
