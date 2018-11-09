import React, { Component, Fragment } from 'react';
import { Button } from 'react-materialize';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../store/modules/user'
import axios from 'axios';

class UserContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.props.UserActions.userRequest(this.props.id)
    .then(() => this.setState({ user: this.props.userData }))
  }

  render() {
    if(this.state.user) return(
      <Fragment>
        <div className="user-head">
          <img className="circle" style={{backgroundColor: '#000'}}></img>
          <div className="user-info">
            <div className="btns">
            {this.props.currentUser.id == this.state.userData.id ?
              <Button>구독하기</Button> :
              <Button>편집하기</Button>
            }</div>
            <div className="user-name">
              <div>{this.state.user.name}</div>
            </div>
            <div className="divider"></div>
            <div className="user-bio">
              설명
            </div>
          </div>
        </div>
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