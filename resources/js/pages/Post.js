import React from 'react';
import PostContainer from '../containers/post/PostContainer'

const Post = ({ match, history }) => {
  const { id } = match.params;

  return(
    <div className="article-wrapper">
      <PostContainer
        history={history}
        article={id}
      />
    </div>
  );
}

export default Post;