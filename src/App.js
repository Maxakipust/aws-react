import React from 'react';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      data:null,
    }
  }

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
        this.setState({data:response})
      })
  }

  render() {
    if(!this.state.data){
      return <div className="app">
        <h1>Loading</h1>
      </div>
    }
    return (
      <div className="app">
        <h1>{JSON.stringify(this.state.data)}</h1>
      </div>
    )
  }
}

export default App;
