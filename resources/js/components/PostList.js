import React from 'react';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import { dateSplit } from '../lib/tool'

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
          <span>{dateSplit(post.created_at, '년', '월', '일')}</span>
          <span></span>
        </div>
      </div>
      <div className="description">
        {post.body.length > 80 ? post.body.substr(0, 80)+' ...' : post.body}
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
