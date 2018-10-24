import React from 'react';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

const Post = ({post}) => (
  <div className="postcard">
    <Link className="post-thumbnail" to={`/articles/${post.id}`}>
      {post.thumbnail ?
        <img src=""></img> :
        <Icon>image</Icon>    
      }
      <div className="white-mask"></div>
    </Link>
    <div className="postcard-content">
      <Link className="user-thumbnail" to="#">
      </Link>
      <div className="content-head">
        <Link className="username" to="#">{post.user}</Link>
        <div className="title">
          <Link to={`/articles/${post.id}`}>{post.title}</Link>
        </div>
        <div className="subinfo">
          <span>{post.created_at}</span>
          <span></span>
        </div>
      </div>
      <div className="description">
        {post.body.length > 100 && post.body.substr(0, 100)}
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
