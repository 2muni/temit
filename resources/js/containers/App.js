import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props)

    this.handlePost = this.handlePost.bind(this);
  }

  handlePost() {
    this.props.articlePostValue('');
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
          <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
          <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
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
