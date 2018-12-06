import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { produce } from 'immer';
import axios from 'axios'

import { resize } from '../../lib/tool';
import * as snapshotActions from '../../store/modules/snapshot'
import * as userActions from '../../store/modules/user'
import { SSWrite } from '../../components/snapshot/SSWrite';
import { Preloader } from '../../components/etc'
import SnapshotContainer from './SnapshotContainer'

class HomeContainer extends Component {

  constructor(props) {
    super(props)

    this.page = 1;
    this.state = {
      isFixed: false,
      isLoading: true,
      body: '',
      preview: '',
      list: []
    }
    this.onScroll = this.onScroll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dataLoad = this.dataLoad.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.addImage = this.addImage.bind(this);
  }

  dataLoad() {
    this.setState({ isLoading: true });
    this.props.currentUser && this.props.UserActions.getActivityRequest(this.props.currentUser.id, { page: this.page })
    .then(() => this.setState(produce(this.state, draft => {
      draft.list = this.state.list.concat(this.props.userActivity);
      draft.isLoading = false;
    })));
  }

  componentDidMount() {
    this.dataLoad();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.currentUser !== this.props.currentUser) this.dataLoad();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if(
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 800) &&
      this.state.list.length && !this.state.isLoading
    ) {
      this.page++;
      this.dataLoad();
    }
  }

  handleChange(e) {
      if(e.target.value.length < 151)
        this.setState({ body: e.target.value })
    }
  
  handleSubmit() {
    let data = new FormData();
    data.append('user_id', this.props.currentUser.id);
    data.append('body', this.state.body);
    if(this.state.preview) {
      this.requestImageURL(this.state.preview, 'snapshots')
        .then((uri) => data.append('uri', uri))
        .then(() => {
          this.props.SnapshotActions.postRequest(data)
          .then(() => this.setState({
            body: '',
            preview: '',
          }))
          .then(() => {
            this.props.currentUser && this.props.UserActions.getActivityRequest(this.props.currentUser.id)
            .then(() => this.setState({
              list: this.props.userActivity
            }))
          })
        })
    }else {
      this.props.SnapshotActions.postRequest(data)
        .then(() => this.setState({
          body: '',
          preview: '',
        }))
        .then(() => {
          this.props.currentUser && this.props.UserActions.getActivityRequest(this.props.currentUser.id)
          .then(() => this.setState({
            list: this.props.userActivity
          }))
        })
    }
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
      data.append('user_id', this.props.currentUser.id);
      data.append('path', path);
      const image = new Image();
      image.src = blob;
      image.onload = imageEvent => {
        data.append('image', resize(768, image), this.props.currentUser.name);
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
        {this.state.list.length > 0 ? 
          this.state.list.map((item, i) => (
            <SnapshotContainer
              key={i}
              snapshot={item}
              user={this.props.currentUser}
            />
        ))
        : 
          !this.state.isLoading &&
          <div className="no-followees">
            <p><h1>Temit에 오신 것을 환영합니다!</h1></p>
            <p>관심있는 작성자를 구독하여 시작해보세요.</p>
            <p>실시간 채팅 및 새 글 알림을 받을 수 있습니다.</p>
          </div>
        }
        {this.state.isLoading ? <Preloader/> : undefined }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  snapshotList: state.snapshot.get.data,
  userActivity: state.user.getActivity.data,
  currentUser: state.authentication.status.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  SnapshotActions: bindActionCreators(snapshotActions, dispatch),
  UserActions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
