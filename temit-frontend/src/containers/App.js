import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { connect } from 'react-redux'
import {  } from '../actions/article'



class App extends Component {

  handlePost = () => {
    this.props.articlePostValue('');
  }

  path = /(login|register|post)/;
  isHidden = this.path.test(this.props.location.pathname);

  render() {
    return (
      this.isHidden ? <></> :
      <header>
        <Navbar brand='temit' right>
          <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
          <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
        </Navbar>
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
