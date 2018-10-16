import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize'
class App extends Component {
  render() {
    return (
      <header>
        <Navbar brand='temit' right>
          <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
          <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
          <NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
          <NavItem href='get-started.html'><Icon>more_vert</Icon></NavItem>
        </Navbar>
      </header>
    );
  }
}

export default App;
