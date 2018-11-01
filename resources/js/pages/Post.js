import React from 'react';
import PostContainer from '../containers/post/PostContainer'
import PostCommentContainer from '../containers/post/PostCommentContainer'

const Post = ({ match }) => {
  const { id } = match.params;

  return(
    <div className="article-wrapper">
      <PostContainer article={id}/>
      <PostCommentContainer article={id}/>
    </div>
  );
}

export default Post;