import React from 'react';
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import marked from 'marked'
import { Icon } from 'react-materialize';

const formatter = buildFormatter(koreanStrings)

const SSItem = ({
  isSnapshot,
  data
}) => {
  if(isSnapshot) return(
    <React.Fragment>
      <div className="snapshot-head">
        <img className="circle" alt="user-profile" src={data.user.thumbnail}/>
        <div className="info">
          <Link to={`/users/${data.user.id}`}>{data.user.name}</Link>
          <div className="date">
            <TimeAgo date={data.created_at} formatter={formatter} />
          </div>
        </div>
      </div>
      <div className="snapshot-body">{data.body}</div>
      {data.uri ?
        <img src={data.uri}/> :
        <React.Fragment></React.Fragment>}
    </React.Fragment>
  );
  else return (
    <React.Fragment>
      <div className="snapshot-head">
        <img className="circle" alt="user-profile" src={data.user.thumbnail}/>
        <div className="info">
          <Link to={`/users/${data.user.id}`}>{data.user.name}</Link>
          <span>님이 게시물을 작성하였습니다.</span>
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
    </React.Fragment>
  )
}

export default SSItem