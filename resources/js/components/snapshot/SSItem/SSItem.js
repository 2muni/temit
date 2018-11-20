import React from 'react';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom'
import marked from 'marked'

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
    <div className="snapshot-item">
      <div className="snapshot-head">
        <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
        <div className="info">
          <a href="#">{data.user.name}</a>님이 게시물을 작성하였습니다.
          <div className="date">{data.create_at}</div>
        </div>
      </div>
      {/* {data.thumbnail ?
        <img src={`${data.thumbnail}`} />
      : <Icon>image</Icon>}
      <div className="snapshot-body">
        <div>{data.body}</div>
      </div> */}
      <div className="postcard">
      <Link className="post-thumbnail" to={`/post/${data.id}`}>
        {data.thumbnail ?
          <img src={data.thumbnail}/> :
          <Icon>image</Icon>}
        <div className="white-mask"></div>
      </Link>
      <div className="description">
      {data.body.length > 150 ?
        marked(data.body.substr(0, 150)).replace(/(<([^>]+)>)/ig,"") :
        marked(data.body).replace(/(<([^>]+)>)/ig,"")}
      </div>
      </div>
    </div>
  )
}

export default SSItem