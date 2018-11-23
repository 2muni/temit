import React, { Component, Fragment } from 'react';
import { Header } from '../../components/base'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../store/modules/authentication';
import { createCookie, getCookie } from '../../lib/cookie'

class HeaderContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      currentUser: ''
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    let loginData = getCookie('user');
    if(typeof loginData === "undefined") return this.props.history.push('/login');
    else if(!loginData.isLoggedIn) return this.props.history.push('/login');

    this.props.AuthActions.userRequest()
    .then(() => { !this.props.status.valid && this.props.history.push('/login')})
  }

  handleLogout() {
    this.props.AuthActions.logoutRequest()
    createCookie('user', {
      isLoggedIn: false,
      currentUser: ''
    })
  }

  render() {
    const path = /(login|register|write)/;
    const isHidden = path.test(this.props.location.pathname);
    
    return (
      isHidden ? <Fragment></Fragment> : 
      <Header
        handleLogout={this.handleLogout}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.authentication.status
})

const mapDispatchToProps = (dispatch) => ({
  AuthActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
