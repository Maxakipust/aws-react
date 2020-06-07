import React from 'react';
import SignIn from './login'
import ResetPassword from "./ResetPassword";
import SignUp from "./SignUp";
import LoggedIn from "./loggedin";
import ConfirmEmail from "./ConfirmEmail";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      page:"login",
    }
  }

  setPage(page, others){
      this.setState({page, ...others});
  }


  render() {
      let boundSetPage = this.setPage.bind(this);
      let getPage = {
          login:<SignIn setPage={boundSetPage}/>,
          resetPassword:<ResetPassword setPage={boundSetPage}/>,
          signUp:<SignUp setPage={boundSetPage}/>,
          success:<LoggedIn setPage={boundSetPage} accessToken={this.state.accessToken} cognitoUser={this.state.cognitouser}/>,
          verifyEmail:<ConfirmEmail setPage={boundSetPage} email={this.state.email}/>
      };
      return getPage[this.state.page]
  }
}

export default App;
