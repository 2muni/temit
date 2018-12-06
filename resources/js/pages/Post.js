import React from 'react';
import PostContainer from '../containers/post/PostContainer'
import AsideContainer from '../containers/base/AsideContainer'

const Post = ({ match, history }) => {
  const { id } = match.params;

  return(
    <div className="content-wrapper" style={{backgroundColor: '#fff'}}>
      <PostContainer
        history={history}
        article={id}
      />
      <AsideContainer/>
    </div>
  );
}

export default Post;