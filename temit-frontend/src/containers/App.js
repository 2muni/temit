import React, { Component } from 'react';
import { Navbar, NavItem, Icon, Button } from 'react-materialize'
class App extends Component {
  render() {
    return (
      <header>
      {console.log(this.props.location.pathname)}
        {this.props.location.pathname === '/post' ? 
        <Navbar brand='temit' right>
          <NavItem href='get-started.html'><Button className="red">작성하기</Button></NavItem>
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

export default App;
