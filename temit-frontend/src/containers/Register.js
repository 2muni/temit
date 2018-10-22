import React, { Component } from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../store/modules/authentication';

class Register extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    password_confirmation: ''
  }

  handleChange = (e) => {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) 
        this.handleRegister();
  }
  
  handleRegister = () => {
    
    const email = this.state.email;
    const password = this.state.password;
    const username = this.state.username;
    
    this.props.registerRequest(email, password, username).then(
      () => {
        if(this.props.status === "SUCCESS") {
          alert('회원가입이 완료되었습니다!' );
          this.props.history.push('/login');
        }else {
          /*
              ERROR CODES:
                  1: BAD USERNAME
                  2: BAD PASSWORD
                  3: USERNAME EXISTS
          */
          const errorMessage = [
            'Invalid Username',
            'Password is too short',
            'Username already exists'
          ];

          this.setState({
            email: '',
            password: '',
            username: ''
          })
          alert(errorMessage[this.props.errorCode - 1]);
        }
      }
    )
  }

  render() {
    return (
      <>
        <Authentication
          mode={false}
          email={this.state.email}
          password={this.state.password}
          password_confirmation={this.state.password_confirmation}
          username={this.state.username}
          handleChange={this.handleChange}
          handleKeyPress={this.handleKeyPress}
          handleRegister={this.handleRegister} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.authentication.register.status,
  errorCode: state.authentication.register.error
});

const mapDispatchToProps = (dispatch) => ({
  AuthActions: bindActionCreators(authActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);