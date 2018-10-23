import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import axios from 'axios';
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentUser: document.head.querySelector('meta[name="user"]').content
    }

    this.handlePost = this.handlePost.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handlePost() {
    this.props.articlePostValue('');
  }

  handleLogout() {
    const data = new FormData;
    data.append('_token', document.head.querySelector('meta[name="csrf-token"]').content);
    axios.post('/logout', data);
  }

  render() {

    const path = /(login|register|post)/;
    const isHidden = path.test(this.props.location.pathname);

    return (
      isHidden ? <React.Fragment></React.Fragment> :
      <header>
        <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">temit</a>
          <ul className="right hide-on-med-and-down">
          <li>
          <a href='/login' onClick={this.handleLogout}>로그아웃</a>
          </li>
          </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
