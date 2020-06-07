import React from 'react';

class App extends React.Component{

  componentDidMount(){
    fetch(
      " https://88ilaxa0x8.execute-api.us-east-1.amazonaws.com/test/api",
      {
        mode:"cors",
        headers:{
          day:"Today"
        }
      }
    )
      .then((res)=>res.json())
      .then((response)=>{
        console.log(response);
      })
  }

  render() {
    return (
      <div>
        <h1>It works</h1>
      </div>
    )
  }
}

export default App;
