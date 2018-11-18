import React from 'react';
import { Icon } from 'react-materialize';

const SSItem = ({
  isSnapshot,
  data
}) => {
  if(isSnapshot) return(
    <div className="snapshot-item">
      <div className="snapshot-head">
        <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
        <div className="info">
          <a href="#">{data.user.name}</a>
          <div className="date">{data.create_at}</div>
        </div>
      </div>
      <div className="snapshot-body">
        <div>{data.body}</div>
      </div>
      <div className="snapshot-replies">
        <div className="reply">
          <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
          <div className="body">
          <a href="#">이름</a>ㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹ</div>
        </div>
        <input tpye="text"></input>
      </div>
    </div>
  );
  else return (
    <div></div>
  )
}

export default SSItem