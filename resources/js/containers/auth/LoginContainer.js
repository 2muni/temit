import React, { Component } from 'react';
import { Login } from '../../components/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../store/modules/authentication';
import { createCookie, getCookie } from '../../lib/cookie'
import produce from 'immer';
import axios from 'axios'

class LoginContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viaSocial: false,
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // this.handleSocial = this.handleSocial.bind(this);
  }

  componentDidMount() {
    if(this.props.responseURL) {
      this.setState({ viaSocial: true })
      createCookie('token', JSON.parse(this.props.responseURL))
      this.props.AuthActions.userRequest()
      .then(() => this.props.history.push('/'))
    }
    getCookie('user') && getCookie('user').isLoggedIn && this.props.history.push('/')
  }

  handleChange(e) {
    this.setState(produce(this.state, draft => {
      draft[e.target.name] = e.target.value
    }))
  }

  handleKeyPress(e) {
    if(e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSocial(e){
    axios.get(`/${e.target.dataset.target}/redirect`)
      .then((res) => this.props.history.push(res))
  }

  handleSubmit() {
    this.props.AuthActions.loginRequest(this.state)
    .then(() => this.props.AuthActions.userRequest())
    .then(() => {
      if(this.props.user.email_verified_at)
        this.props.status === 'SUCCESS' && this.props.history.push('/')
      else
        alert('인증 메일을 확인하세요.')
      })
  }

  render() {
    return(
      <React.Fragment>
      {!this.state.viaSocial ? 
        <Login
          state={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleKeyPress={this.handleKeyPress}
        />
      : undefined}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.authentication.login.status,
  user: state.authentication.status.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  AuthActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);