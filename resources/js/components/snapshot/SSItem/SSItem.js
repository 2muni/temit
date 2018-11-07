import React from 'react';
import { Icon } from 'react-materialize';

const SSItem = () => (
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
)

export default SSItem