import React from 'react'
import TimeAgo from 'react-timeago'
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { Link } from 'react-router-dom'

const formatter = buildFormatter(koreanStrings)

const HeadBtns = ({
  comment,
  handleCommentRemove
}) => (
  <div className="btns">
    <span
      data-id={comment.id}
      data-user={comment.user.id}
      onClick={handleCommentRemove}>삭제
    </span> 
  </div>
)

const CommentHead = ({
  user,
  comment,
  handleCommentRemove,
}) => (
  <div className="head">
    <a href="#"><img className="circle" src={comment.user.thumbnail}></img></a>
    <div className="name-and-date">
      <Link to={`/users/${comment.user.id}`}>{comment.user.name}</Link>
      <div><TimeAgo date={comment.updated_at} formatter={formatter} /></div>
    </div>
    {user.id === comment.user.id &&
      <HeadBtns
        comment={comment}
        handleCommentRemove={handleCommentRemove}
      />
    }
  </div>
)

export default CommentHead;