import React, { Component } from 'react';
import { Navbar, NavItem, Icon, Button } from 'react-materialize';
import { connect } from 'react-redux'
import { articlePostRequest, articlePostValue } from '../actions/article'

class App extends Component {

  handlePost = () => {
    this.props.articlePostValue('');
  }

  render() {
    return (
      <header>
        {this.props.location.pathname === '/post' ? 
        <Navbar brand='temit' right>
          <NavItem href='#'><Button className="red" onClick={this.handlePost}>작성하기</Button></NavItem>
        </Navbar>
        :
        <Navbar brand='temit' right>
          <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
          <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
        </Navbar>
        }
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postStatus: state.article.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articlePostRequest: (data) => {
      dispatch(articlePostRequest(data));
    },
    articlePostValue: (value) => {
      dispatch(articlePostValue(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
