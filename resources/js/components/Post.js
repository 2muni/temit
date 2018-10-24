import React from 'react';
import { Link } from 'react-router-dom'

const Post = ({ article }) => (
  <div className="article-wrapper">
    <div className="article-head">
      <div className="userinfo">
        <Link to="#">{article.thumbnail}</Link>
      </div>
      <div className="title"></div>
      <div className="date-and-likes"></div>
      <div className="divider"/>
    </div>
    <div className="article-content">

    </div>
    <div className="article-tags">

    </div>
    <div className="article-comments">

    </div>
  </div>
)

export default Post