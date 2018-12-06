import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { produce } from 'immer';
import socketIOClient from "socket.io-client";
import axios from 'axios'

import { createCookie, getCookie } from '../../lib/cookie'
import { Header } from '../../components/base/Header'
import * as authActions from '../../store/modules/authentication';


class HeaderContainer extends Component {

  constructor(props) {
    super(props)
    
    this.rooms=[]
    
    this.state = {
      currentMenu:'',
      notification:[]
    }
    
    this.connectSocketChannel = this.connectSocketChannel.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }
  
  connectSocketChannel(index, channel) {
    this.rooms.push(socketIOClient('/', {
      secure: true,
      rejectUnauthorized: false,
      path: '/socket/socket.io'
    }))
    
    this.rooms[index].on(`${channel}:App\\Events\\NotificationSent`, data => {
      this.setState(produce(this.state, draft => {
       draft.notification.push(data.data)
      }))
      console.log(data.data)
    })
  }
  
  componentDidMount() {
    let loginData = getCookie('user');
    if(typeof loginData === "undefined") return this.props.history.push('/login');
    else if(!loginData.isLoggedIn) return this.props.history.push('/login');

    this.props.AuthActions.userRequest()
    .then(() => { !this.props.status.valid && this.props.history.push('/login') })
    .then(() => {
      console.log(this.props.status.currentUser)
      
      this.connectSocketChannel(0, this.props.status.currentUser.id);
      
      const { followees } = this.props.status.currentUser;
      
      for(let index = 0; index < followees.length; index++) {
        this.connectSocketChannel(index+1, followees[index].id);
      }
    })
    
    window.onclick = this.handleMenu;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.status.currentUser !== this.props.status.currentUser || 
           nextProps.location.pathname !== this.props.location.pathname ||
           nextState.currentMenu !== this.state.currentMenu
  }

  componentDidUpdate(nextProps, nextState) {
    if(nextProps.location.pathname !== this.props.location.pathname
    && this.props.location.pathname !== '/register'
    && this.props.location.pathname !== '/login'){
      this.props.AuthActions.userRequest()
      .then(() => {
        !this.props.status.valid && this.props.history.push('/login')
      })
    }
  }

  handleLogout() {
    this.props.AuthActions.logoutRequest()
    createCookie('user', {
      isLoggedIn: false,
      currentUser: ''
    })
  }
  
  handleMenu(e) {
    if(e.target.matches('.dropbtn')) {
      this.setState({ currentMenu: e.target.innerText })
    }else {
      this.setState({ currentMenu: '' })
    }
    
  }

  render() {
    const path = /(login|register|write)/;
    const isHidden = path.test(this.props.location.pathname);
    return (
      isHidden ? <Fragment></Fragment> : 
      <Header
        currentMenu={this.state.currentMenu}
        handleLogout={this.handleLogout}
        handleMenu={this.handleMenu}
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
