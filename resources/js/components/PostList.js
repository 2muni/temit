import React from 'react';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import marked from 'marked'

const formatter = buildFormatter(koreanStrings)

const Post = ({post}) => (
  <div className="postcard">
    <Link className="post-thumbnail" to={`/articles/${post.id}`}>
      {post.thumbnail ?
        <img src={post.thumbnail}/> :
        <Icon>image</Icon>    
      }
      <div className="white-mask"></div>
    </Link>
    <div className="postcard-content">
      <Link className="user-thumbnail" to="#">
      </Link>
      <div className="content-head">
        <Link className="username" to="#">{post.user.name}</Link>
        <div className="title">
          <Link to={`/articles/${post.id}`}>{post.title}</Link>
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
  </div>
)

const PostList = ({ list }) => (
  <div className="postcard-list">
    {list.map((post) => (
      <Post key={post.id} post={post}/>
    ))}
  </div>
)

export default PostList;
