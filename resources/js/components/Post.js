import React from 'react';
import { Link } from 'react-router-dom'
import { Icon, Button } from 'react-materialize';
import TimeAgo from 'react-timeago'
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import PostCommnet from './PostComment';

const formatter = buildFormatter(koreanStrings)

const handleHeight = (e) => {
  e.target.style.height = '120px';
  e.target.style.height = (e.target.scrollHeight)+"px";
}
const handleFocus = (e) => {
  e.target.style.minHeight = '120px';
  e.target.rows = '4';
}
const handleBlur = (e) => {
  if(e.target.value) {
    e.target.style.minHeight = '120px';
    e.target.rows = '4';
  }
  else{
    e.target.style.height = '53px';
    e.target.style.minHeight = '0';
    e.target.rows = '1';
  }
}

const Post = ({ 
  article,
  user,
  handleArticleRemove,
  handleCommentSubmit,
  handleCommentEdit,
  handleCommentRemove,
  handleEdit,
  handleChange,
  replies,
  comments,
  edit_to
}) => (
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
        </div> : undefined
      }
    </div>
    <img className="article-thumbnail" src={article.thumbnail}/>
    <div className="article-content"/>
    <div className="article-tags">
      {article.tags.map((tag, i) => (
        <a key={i} href="#">{tag.tag}</a>
      ))}
    </div>
    <div className="article-comments">
      <div>{comments.length}개의 댓글</div>
      <textarea rows="1" style={{ height: '53px' }}
        name="replies"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={handleHeight}
        onChange={handleChange}
        value={replies}
        />
      <div className="btn-wrapepr">
        <Button onClick={handleCommentSubmit}>댓글 작성</Button>
      </div>
      <div className="comment-list">
      {comments.map((comment, i) => {
        if(edit_to.id == comment.id) {
          return(
            <div key={i} className="comment">
              <div className="head">
                <a href="#"><img className="circle" style={{backgroundColor: '#000'}}></img></a>
                <div className="name-and-date">
                  <a href="#">{comment.user.name}</a>
                  <div>
                  {comment.updated_at > comment.created_at ?
                    <div><TimeAgo date={comment.updated_at} formatter={formatter} /><span>에 수정됨</span></div> : 
                    <TimeAgo date={comment.created_at} formatter={formatter} /> }
                  </div>
                </div>
                <div className="btns">
                  <span onClick={handleEdit}>취소</span>
                </div>
              </div>
              <textarea rows="1" style={{ height: '53px' }}
                name="edit_to"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyUp={handleHeight}
                onChange={handleChange}
                value={edit_to.comment}
              />
              <div className="btn-wrapepr">
                <Button onClick={handleCommentEdit}>댓글 작성</Button>
              </div>
            </div>
          )
        }else if(!comment.reply_to){
          return(
            <PostCommnet
              key={i}
              article={article}
              comment={comment}
              user={user}
              handleCommentRemove={handleCommentRemove}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
              handleHeight={handleHeight}
              article={article}
              user={user}
            />)
        }
      })}
      </div>
    </div>
  </React.Fragment>
)

export default Post