import React, { Fragment } from 'react'

import TimeAgo from 'react-timeago'
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

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
  handleEdit,
  handleCommentRemove,
}) => (
  <div className="head">
    <a href="#"><img className="circle" style={{backgroundColor: '#000'}}></img></a>
    <div className="name-and-date">
      <a href="#">{comment.user.name}</a>
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