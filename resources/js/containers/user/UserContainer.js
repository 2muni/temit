import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../store/modules/user';
import * as authActions from '../../store/modules/authentication'
import { UserHead } from '../../components/user/UserHead';
import { produce } from 'immer';
import { resize } from '../../lib/tool';
import { Preloader } from '../../components/etc';
import axios from 'axios';

class UserContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      edit: {
        name: '',
        bio: '',
        thumbnail: '',
      },
      isEdit: false,
      isFollowing: false,
    }

    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.addImage = this.addImage.bind(this);
  }

  componentDidMount() {
    this.props.UserActions.userRequest(this.props.id)
    .then(() => {
      this.setState({ user: this.props.userData });
      this.props.userData.followers.map(( follower ) => {
        if(follower.id == this.props.currentUser.id) {
          this.setState({ isFollowing: true });
        }
      })
    })
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
    if(e.target.name === 'name' && e.target.value.length > 16) {
      e.target.style.backgroundColor = '#e74c3c';
    }else if(e.target.name === 'bio' && e.target.value.length > 60) {
      e.target.style.backgroundColor = '#e74c3c';
    }else{
      e.target.style.backgroundColor = '#e1f0fa';
      this.setState(
        produce(this.state, draft => {
          draft.edit[e.target.name] = e.target.value;
        })
      )
    }
  }

  handleSubmit() {
    let data = new FormData();
    data.append('name', this.state.edit.name)
    data.append('bio', this.state.edit.bio)
    data.append('thumbnail', this.state.edit.thumbnail)
    this.props.UserActions.editRequest(this.props.id, data)
    .then(() => 
      this.props.AuthActions.userRequest()
      .then(() => this.setState({ isEdit: false }))
    )
    
  }

  handleFollow() {
    let data = new FormData();
    data.append('parent_id', this.props.id)
    data.append('follower_id', this.props.currentUser.id)
    if(!this.state.isFollowing) {
      this.props.UserActions.followRequest(data)
      .then(() => this.setState({ isFollowing: true }))
    }else {
      this.props.UserActions.unfollowRequest(data)
      .then(() => this.setState({ isFollowing: false }))
    }
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
    console.log("CU", this.props.currentUser);
    console.log("state", this.state.user)
    return(
      <div className="user-wrapper">
        {this.props.currentUser && this.state.user ? 
          <Fragment>
            <UserHead
              currentUser={this.props.currentUser}
              user={this.state.user}
              isFollowing={this.state.isFollowing}
              isEdit={this.state.isEdit}
              edit={this.state.edit}
              handleToggle={this.handleToggle}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleFollow={this.handleFollow}
              addImage={this.addImage}
            />
            <div className="user-body">
    
            </div>
          </Fragment>
        :
          <Preloader/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.get.user,
  currentUser: state.authentication.status.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch),
  AuthActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(UserContainer);