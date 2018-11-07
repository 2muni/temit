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
      body: '',
      preview: '',
    }
    this.onScroll = this.onScroll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addImage = this.addImage.bind(this);
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

  handleChange(e) {
    console.log(e.target.value.substr(e.target.value.length - 1))
    if(e.target.value.substr(e.target.value.length - 1) == ' ')
      console.log('space!')
    if(e.target.value.length < 151)
      this.setState({ body: e.target.value })
  }

  addImage(e) {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ preview: reader.result })
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    return(
      <div className="snapshot-column">
        <SSWrite
          addImage={this.addImage}
          handleChange={this.handleChange}
          body={this.state.body}
          preview={this.state.preview}
        />
        <SSItem/>
        <SSItem/>
      </div>
    );
  }

}

export default SnapshotContainer;
