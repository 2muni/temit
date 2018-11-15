import React from 'react';
import PostContainer from '../containers/post/PostContainer'
import { getCookie } from '../lib/cookie'

const Post = ({ match, history }) => {
  const { id } = match.params;

  return(
    <div className="article-wrapper">
      <PostContainer
        user={getCookie('user').currentUser} 
        history={history}
        article={id}
      />
    </div>
  );
}

export default Post;