import React from 'react';
import { Link } from 'react-router-dom'
import { Icon, Button } from 'react-materialize';
import { dateSplit } from '../lib/tool'

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

const Comment = ({
  comment,
  user,
  handleCommentRemove,
  handleEdit
}) => (
  <div className="comment">
    <div className="head">
      <a href="#"><img className="circle" style={{backgroundColor: '#000'}}></img></a>
      <div className="name-and-date">
        <a href="#">{comment.user.name}</a>
        <div>{comment.created_at}</div>
      </div>
      {user === comment.user.id &&
        <div className="btns">
          <span data-label="comment-edit" data-id={comment.id} data-user={comment.user.id} onClick={handleEdit}>수정</span>
          <span data-id={comment.id} data-user={comment.user.id} onClick={handleCommentRemove}>삭제</span>
        </div>
      }
    </div>
    <div className="body">{comment.comment.split('\n').map((line, i) => (
      <span key={i}>{line}<br/></span>
    ))}</div>
    <span className="replies-button">답글 달기</span>
  </div>
)

const Post = ({ 
  article,
  user,
  handleArticleRemove,
  handleCommentSubmit,
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
          <a href="/" onClick={handleArticleRemove}>삭제</a>
        </div> : undefined
      }
    </div>
    <img className="article-thumbnail" src={article.thumbnail}/>
    <div className="article-content"/>
    <div className="article-tags">
      <a href="#">teg 1</a>
      <a href="#">teg 1</a>
      <a href="#">teg 1</a>
      <a href="#">teg 1</a>
      <a href="#">teg 1</a>
    </div>
    <div className="article-comments">
      <div>{comments.length}개의 댓글</div>
      <textarea rows="1" style={{ height: '53px' }}
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
        if(edit_to == comment.id) {
          return(
            <div className="comment">
              <div className="head">
                <a href="#"><img className="circle" style={{backgroundColor: '#000'}}></img></a>
                <div className="name-and-date">
                  <a href="#">{comment.user.name}</a>
                  <div>{comment.created_at}</div>
                </div>
                <div className="btns">
                  <span onClick={handleEdit}>취소</span>
                </div>
              </div>
              <textarea rows="1" style={{ height: '53px' }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyUp={handleHeight}
                onChange={handleChange}
                value={replies}
              />
              <div className="btn-wrapepr">
                <Button onClick={handleCommentSubmit}>댓글 작성</Button>
              </div>
            </div>
          )
        }else {
          return(
            <Comment
              key={i}
              comment={comment}
              user={user}
              handleCommentRemove={handleCommentRemove}
              handleEdit={handleEdit}
            />)
        }
      })}
      </div>
    </div>
  </React.Fragment>
)

export default Post