import React from 'react';

const CommentBody = ({
  comment,
}) => (
  <div className="body">{comment.comment.split('\n').map((line, i) => (
    <span key={i}>
      {line}<br/>
    </span>))}
  </div>
)

export default CommentBody;