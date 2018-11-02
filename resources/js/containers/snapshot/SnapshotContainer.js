import React, { Component, Fragment } from 'react';
import produce from 'immer';
import axios from 'axios';

import { Icon } from 'react-materialize'

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

  shouldComponentUpdate() {
    return true;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if(window.scrollY < 100 && this.state.isFixed ) this.setState({isFixed:false})
    else if(window.scrollY > 99 && !this.state.isFixed) this.setState({isFixed: true})
  }

  render() {
    return(
      <Fragment>
      <div className="snapshot-nav">
      <div className="fixed-frame" style={ this.state.isFixed ? {position: 'fixed', top: '11px'} : {position: 'static'} }>

      
        <div className="user-profile">
          <div className="user-img-0">
            <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
          </div>
          <div className="user-name">이름</div>
        </div>
        <div className="post-navitem">
          <a href="/write">글쓰기</a>
        </div>
        </div>
      </div>

      <div className="snapshot-column">

        <div className="snapshot-item">

          <div className="snapshot-head">
            <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
            <div className="info">
              <a href="#">이름</a>
              <a href="#">위치</a>
            </div>
          </div>

          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"/>

          <div className="snapshot-body">
            <div className="btns">
              <Icon>favorite_border</Icon>
              <Icon>add_comment</Icon>
              <Icon>bookmark_border</Icon>
            </div>
            <div>좋아요 n/a개</div>
            <div>본문 텍스트</div>
            <div className="date">11월 2일</div>
            <div className="replies">
              <input tpye="text"></input>
            </div>
          </div>

        </div>
        <div className="snapshot-item">

          <div className="snapshot-head">
            <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
            <div className="info">
              <a href="#">이름</a>
              <a href="#">위치</a>
            </div>
          </div>

          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"/>

          <div className="snapshot-body">
            <div className="btns">
              <Icon>favorite_border</Icon>
              <Icon>add_comment</Icon>
              <Icon>bookmark_border</Icon>
            </div>
            <div>좋아요 n/a개</div>
            <div>본문 텍스트</div>
            <div className="date">11월 2일</div>
            <div className="replies">
              <input tpye="text"></input>
            </div>
          </div>

          </div>

      </div>
      </Fragment>
    );
  }

}

export default SnapshotContainer;
