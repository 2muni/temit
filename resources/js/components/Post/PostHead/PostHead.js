import React from 'react';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

const formatter = buildFormatter(koreanStrings)

const PostHead = ({
  user,
  article,
  handleArticleRemove,
}) => (
  <div className="article-head">
    <div className="userinfo">
      <Link to="#" className="user-thumbnail">
        <img className="circle" alt="user-profile" src={article.user.thumbnail}/>
      </Link>
      <div className="info">
        <Link to="#" className="username">{article.user.email.substring(0, article.user.email.indexOf('@'))}</Link>
        <div className="bio">{article.user.bio}</div>
      </div>
    </div>

    <div className="title">{article.title}</div>

    <div className="date-and-likes">
      {article.updated_at > article.created_at ?
        <div><TimeAgo date={article.updated_at} formatter={formatter} /><span>에 수정됨</span></div> : 
        <TimeAgo date={article.created_at} formatter={formatter} /> }
      <button className="like">
        <Icon>favorite_border</Icon>
        <span>{article.like}</span>
      </button>
    </div>

    <div className="divider"/>
    {user.id === article.user.id ?
    <div className="options">
      <Link to={`/write/${article.id}`}>수정</Link>
      <span onClick={handleArticleRemove}>삭제</span>
    </div> : undefined}
  </div>
)

export default PostHead;