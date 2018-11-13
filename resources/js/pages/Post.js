import React from 'react';
import PostContainer from '../containers/post/PostContainer'
import PostCommentContainer from '../containers/post/PostCommentContainer'
import { getCookie } from '../lib/cookie'

const Post = ({ match }) => {
  const { id } = match.params;

  return(
    <div className="article-wrapper">
      <PostContainer
        // user={getCookie('user').currentUser} 
        article={id}
      />
      <PostCommentContainer
        // user={getCookie('user').currentUser}
        article={id}
      />
    </div>
  );
}

export default Post;