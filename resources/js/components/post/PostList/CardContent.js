import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import marked from 'marked'

const formatter = buildFormatter(koreanStrings)

const CardContent = ({
  post
}) => (
  <div className="postcard-content">
    <Link className="user-thumbnail" to={`/users/${post.user.id}`}>
      <img className="circle" alt="user-profile" src={post.user.thumbnail}/>
    </Link>
    <div className="content-head">
      <Link className="username" to={`/users/${post.user.id}`}>{post.user.name}</Link>
      <div className="title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </div>
      <div className="subinfo">
      {post.updated_at > post.created_at ?
        <div><TimeAgo date={post.updated_at} formatter={formatter} /><span>에 수정됨</span></div> : 
        <TimeAgo date={post.created_at} formatter={formatter} /> }
        <span></span>
      </div>
    </div>
    <div className="description">
      {post.body.length > 150 ?
        marked(post.body.substr(0, 150)).replace(/(<([^>]+)>)/ig,"") :
        marked(post.body).replace(/(<([^>]+)>)/ig,"")}
    </div>
  </div>
)

export default CardContent;