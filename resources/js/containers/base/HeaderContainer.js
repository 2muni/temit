import React, { Component, Fragment } from 'react';
import { Header } from '../../components/base'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../store/modules/authentication';
import { createCookie, getCookie } from '../../lib/auth'
import axios from 'axios';

class HeaderContainer extends Component {

  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this);
  }


  componentDidMount() {
    // let loginData = createCookie('auth');
    // if(typeof loginData === "undefined") return;

    // loginData = JSON.parse(atob(loginData));
    // if(!loginData.isLoggedIn) return;

    // const token = loginData.token_type+' '+loginData.access_token;
    // axios.get('/api/auth/user', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'Authorization': token
    //   }})
    // .then((res)=>console.log(res))
  }

  handleLogout() {
    const data = new FormData;
    this.props.UserActions.logoutRequest(data);
  }

  render() {

    const path = /(login|register|write)/;
    const isHidden = path.test(this.props.location.pathname);
    console.log("render");
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
  UserActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
