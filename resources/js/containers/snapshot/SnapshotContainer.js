import React, { Component } from 'react';
import { SSWrite } from '../../components/snapshot/SSWrite';
import { SSItem } from '../../components/snapshot/SSItem';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as snapshotActions from '../../store/modules/snapshot'
import { resize } from '../../lib/tool';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Button } from 'react-materialize';

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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  // handleClick(e) {
  //   const isAddPerson = /(add-person)/.test(e.target.className)
  //   if(isAddPerson) {
  //     this.setState({ body: this.state.body.concat(' #')})
  //   }else {
  //     this.setState({ body: this.state.body.concat(' @')})
  //   }
  //   document.querySelector('#text').focus();
  // }

  handleChange(e) {
  //    console.log(e.target.value.substr(e.target.value.length - 1))
    if(e.target.value.length < 151)
      this.setState({ body: e.target.value })
  }

  handleSubmit() {
    let data = new FormData();
    data.append('user_id', this.props.user.id);
    data.append('body', this.state.body);
    this.requestImageURL(this.state.preview, 'snapshots')
    .then((uri) => data.append('uri', uri))
    .then(() => this.props.SnapshotActions.postRequest(data))
    .then(() => this.setState({
      body: '',
      preview: '',
    }))
  }

  addImage(e) {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ preview: reader.result })
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  requestImageURL(blob, path) {
    return new Promise((res, rej) => {
      let data = new FormData();
      data.append('user_id', this.props.user.id);
      data.append('path', path);
      const image = new Image();
      image.src = blob;
      image.onload = imageEvent => {
        data.append('image', resize(768, image), this.props.user.name);
        res(axios.post('/api/images', data)
        .then((res) => (res.data)));
      }
    });
  }

  render() {
    return(
      <div className="snapshot-column">
        <SSWrite
          addImage={this.addImage}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          body={this.state.body}
          preview={this.state.preview}
        />
        <SSItem/>
        <SSItem/>
        <Link to='/write'>
          <Button floating icon='add_a_photo' className='floatBtn circle' large style={{bottom: '45px', right: '45px'}}/>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  snapshotList: state.snapshot.get.data
})

const mapDispatchToProps = (dispatch) => ({
  SnapshotActions: bindActionCreators(snapshotActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SnapshotContainer);
