import React from 'react';
import { Link } from 'react-router-dom'

const Post = ({ article }) => (
  <div className="article-wrapper">
    <div className="article-head">
      <div className="userinfo">
        <Link to="#" className="user-thumbnail">{article.user.thumbnail ? <img></img> : <img></img> }</Link>
        <div className="info">
          <Link to="#" className="username">{article.user.name}</Link>
          <div className="bio">{article.user.name}</div>
        </div>
      </div>
      <div className="title">{article.title}</div>
      <div className="date-and-likes">{article.create_at}</div>
      <div className="divider"/>
    </div>
    <div className="article-content">
      {article.body}
    </div>
    <div className="article-tags">
      {article.tags}
    </div>
    <div className="article-comments">
      {article.comments}
    </div>
  </div>
)

export default Post