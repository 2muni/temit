import React from 'react';
import PostListContainer from '../containers/post/PostListContainer'
import AsideContainer from '../containers/base/AsideContainer'

const Post = ({ match }) => {
  const { tag } = match.params;
  
  return(
    <div className="content-wrapper">
      <AsideContainer/>
      <PostListContainer tag={tag}/>
    </div>
  );
}

export default Post;