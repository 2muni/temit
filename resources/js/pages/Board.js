import React from 'react';
import PostListContainer from '../containers/post/PostListContainer'
import AsideContainer from '../containers/base/AsideContainer'

const Post = ({ match }) => {
  const { tag } = match.params;
  
  return(
    <div className="content-wrapper">
      <PostListContainer tag={tag}/>
      <AsideContainer/>
    </div>
  );
}

export default Post;