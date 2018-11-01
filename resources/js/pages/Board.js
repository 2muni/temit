import React from 'react';
import PostListContainer from '../containers/post/PostListContainer'

const Post = ({ match }) => {
  const { tag } = match.params;

  return(
    <div className="content-wrapper">
      <PostListContainer tag={tag}/>
    </div>
  );
}

export default Post;