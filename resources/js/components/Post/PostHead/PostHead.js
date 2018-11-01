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
      {article.updated_at > article.created_at ?
        <div><TimeAgo date={article.updated_at} formatter={formatter} /><span>에 수정됨</span></div> : 
        <TimeAgo date={article.created_at} formatter={formatter} /> }
      <button className="like">
        <Icon>favorite_border</Icon>
        <span>{article.like}</span>
      </button>
    </div>

    <div className="divider"/>
    {user === article.user.id ?
    <div className="options">
      <Link to={`/post/${article.id}`}>수정</Link>
      <a href="/" onClick={handleArticleRemove}>삭제</a>
    </div> : undefined}
  </div>
)

export default PostHead;