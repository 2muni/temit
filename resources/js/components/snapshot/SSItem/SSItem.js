import React from 'react';
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import marked from 'marked'
import { Button, Icon } from 'react-materialize';

const formatter = buildFormatter(koreanStrings)

const SSItem = ({
  isSnapshot,
  data
}) => {
  if(isSnapshot) return(
    <div className="snapshot-item">
      <div className="snapshot-head">
        <img className="circle" alt="user-profile" src={data.user.thumbnail}/>
        <div className="info">
          <a href="#">{data.user.name}</a>
          <div className="date">
            <TimeAgo date={data.created_at} formatter={formatter} />
          </div>
        </div>
      </div>
      <div className="snapshot-body">{data.body}</div>
      {data.uri ?
        <img src={data.uri}/> :
        <React.Fragment></React.Fragment>}
      <div className="snapshot-replies">
        <div className="reply">
          <img className="circle" alt="user-profile" src={data.user.thumbnail}/>
          <div className="body">
          <a href="#">이름</a>ㅇㄴㄹㅁㅇㄴㄹㅁㅇㄴㄹㅁㄹㅁㅇㄴㄹ</div>
        </div>
        <div className="reply">
          <img className="circle" alt="user-profile" src={data.user.thumbnail}/>
          <input className="body" placeholder="댓글을 입력하세요..."></input>
          <Button>작성</Button>
        </div>
      </div>
    </div>
  );
  else return (
    <div className="snapshot-item">
      <div className="snapshot-head">
        <img className="circle" alt="user-profile" src={data.user.thumbnail}/>
        <div className="info">
          <a href="#">{data.user.name}</a>님이 게시물을 작성하였습니다.
          <div className="date">
            <TimeAgo date={data.created_at} formatter={formatter} />
          </div>
          <div className="date">{data.create_at}</div>
        </div>
      </div>
      <Link className="post-thumbnail" to={`/post/${data.id}`}>
        {data.thumbnail ?
          <img src={data.thumbnail}/> :
          <div className="white-space"><Icon>image</Icon></div>}
      </Link>
      <Link className="post-wrapper" to={`/post/${data.id}`}>
        <div className="postcard">
          <div className="title">
            {data.title}
          </div>
          <div className="description">
          {data.body.length > 150 ?
            marked(data.body.substr(0, 150)).replace(/(<([^>]+)>)/ig,"") :
            marked(data.body).replace(/(<([^>]+)>)/ig,"")}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SSItem