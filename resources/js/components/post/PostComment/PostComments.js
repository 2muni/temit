import React from 'react'
import { PostComment, CommentInput } from './';

const PostComments = ({
  user,
  comment,
  list,
  handleChange,
  handleCommentSubmit,
  handleCommentRemove,
}) => (
  <div className="article-comments">
    <div>{list.length}개의 댓글</div>
    <CommentInput
      value={comment}
      handleChange={handleChange}
      handleCommentSubmit={handleCommentSubmit}
    />
    <div className="comment-list">
    {list.map((comment, i) => (
      <PostComment
        key={i}
        user={user}
        comment={comment}
        handleChange={handleChange}
        handleCommentRemove={handleCommentRemove}
      />
    ))}
    </div>
  </div>
)

export default PostComments;