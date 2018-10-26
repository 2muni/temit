import React from 'react';
import { Link } from 'react-router-dom'
import marked from 'marked';
import { Icon } from 'react-materialize';

import { dateSplit } from '../lib/tool'

const Post = ({ article, user, handleRemove }) => (
  <React.Fragment>
    <div className="article-head">
      <div className="userinfo">
        <Link to="#" className="user-thumbnail">{article.user.thumbnail ?
          <img></img> :
          <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
        }</Link>
        <div className="info">
          <Link to="#" className="username">{article.user.name}</Link>
          <div className="bio">{article.user.name}</div>
        </div>
      </div>
      <div className="title">{article.title}</div>
      <div className="date-and-likes">
        {dateSplit(article.created_at,'년 ','월 ','일')}
        <button className="like">
          <Icon>favorite_border</Icon>
          <span>{article.like}</span>
        </button>
      </div>
      <div className="divider"/>
      {user === article.user.id ?
        <div className="options">
          <Link to={`/post/${article.id}`}>수정</Link>
          <a href="/" onClick={handleRemove}>삭제</a>
        </div> : undefined
      }
    </div>
    <img className="article-thumbnail" src={article.thumbnail}/>
    <div className="article-content" dangerouslySetInnerHTML={{__html: marked(article.body)}}/>
    <div className="article-tags">
    </div>
    <div className="article-comments">
      {article.comments}
    </div>
  </React.Fragment>
)

export default Post