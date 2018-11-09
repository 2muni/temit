import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../store/modules/user';
import { UserHead } from '../../components/user/UserHead';
import { produce } from 'immer';
import { resize } from '../../lib/tool';
import axios from 'axios';

class UserContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isEdit: false,
      edit: {
        name: '',
        bio: '',
        thumbnail: '',
      }
    }

    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addImage = this.addImage.bind(this);
  }

  componentDidMount() {
    this.props.UserActions.userRequest(this.props.id)
    .then(() => this.setState({ user: this.props.userData }))
  }

  handleToggle() {
    this.setState(
      produce(this.state, draft => {
        draft.edit = {
          name: this.state.user.name,
          bio: this.state.user.bio,
          thumbnail: this.state.user.thumbnail,
        };
        draft.isEdit = !this.state.isEdit;
      })
    )
  }

  handleChange(e) {
    this.setState(
      produce(this.state, draft => {
        draft.edit[e.target.name] = e.target.value;
      })
    )
  }

  handleSubmit() {
    let data = new FormData();
    data.append('name', this.state.edit.name)
    data.append('bio', this.state.edit.bio)
    data.append('thumbnail', this.state.edit.thumbnail)
    this.props.UserActions.editRequest(this.props.id, data)
    .then(() => this.setState(
      produce(this.state, draft => {
        draft.isEdit = false;
    })))
  }

  addImage(e) {
    const reader = new FileReader();
    reader.onload = () => {
      this.requestImageURL(reader.result, 'avatar')
      .then((uri) => this.setState(
        produce(this.state, draft => {
          draft.edit['thumbnail'] = uri;
        })
      ))
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
        data.append('image', resize(160, image, true), this.props.currentUser.name);
        res(axios.post('/api/images', data)
        .then((res) => (res.data)));
      }
    });
  }

  render() {
    if(this.state.user) return(
      <Fragment>
        <UserHead
          currentUser={this.props.currentUser}
          user={this.state.user}
          isEdit={this.state.isEdit}
          edit={this.state.edit}
          handleToggle={this.handleToggle}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          addImage={this.addImage}
        />
        <div className="user-body">

        </div>
      </Fragment>
    )
    else return(
      <div>loading...</div>
    )
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.get.user
})

const mapDispatchToProps = (dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(UserContainer);