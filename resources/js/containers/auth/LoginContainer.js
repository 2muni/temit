import React, { Component } from 'react';
import { Login } from '../../components/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../store/modules/authentication';
import { getCookie } from '../../lib/cookie'
import produce from 'immer';

class LoginContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getCookie('user') && getCookie('user').isLoggedIn && this.props.history.push('/')
  }

  handleChange(e) {
    this.setState(produce(this.state, draft => {
      draft[e.target.name] = e.target.value
    }))
  }

  handleSubmit() {
    this.props.AuthActions.loginRequest(this.state)
    .then(() => this.props.AuthActions.userRequest())
    .then(() => this.props.status === 'SUCCESS' && this.props.history.push('/'))
  }

  render() {
    return(
      <Login
        state={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.authentication.login.status
})

const mapDispatchToProps = (dispatch) => ({
  AuthActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);