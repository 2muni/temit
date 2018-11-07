import React, { Component, Fragment } from 'react';
import produce from 'immer';
import axios from 'axios';
import { SSWrite } from '../../components/snapshot/SSWrite';
import { SSItem } from '../../components/snapshot/SSItem';

class SnapshotContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isFixed: false,
    }

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
    
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if(window.scrollY < 100 && this.state.isFixed ) this.setState({ isFixed:false })
    else if(window.scrollY > 99 && !this.state.isFixed) this.setState({ isFixed: true })
  }

  render() {
    return(
      <div className="snapshot-column">
        <SSWrite/>
        <SSItem/>
        <SSItem/>
      </div>
    );
  }

}

export default SnapshotContainer;
