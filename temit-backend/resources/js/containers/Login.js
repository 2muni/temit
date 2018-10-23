import React, { Component } from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../store/modules/authentication';
class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }

  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleKeyPress(e) {
    if (e.charCode === 13) this.handleLogin();
  }

  handleLogin() {
    const email = this.state.email;
    const password = this.state.password;
    console.log(this.props.AuthActions);
    // this.props.AuthActions.loginRequest(email, password).then(
    //   () => {
    //     if(this.props.status === "SUCCESS") {
    //       this.props.history.push('/');
    //     }else {
    //       this.setState({
    //         email: '',
    //         password: '',
    //       });
    //     }
    //   }
    // )


  }

  render() {
    return (
      <React.Fragment>
        <Authentication 
          mode={true}
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
          handleKeyPress={this.handleKeyPress}
          handleLogin={this.handleLogin} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  status: state.authentication.login.status
});

const mapDispatchToProps = (dispatch) => ({
  AuthActions: bindActionCreators(authActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);