import React from 'react';
import PostListContainer from '../containers/post/PostListContainer'
import AsideContainer from '../containers/base/AsideContainer'
import { getCookie } from '../lib/cookie'

const Post = ({ match }) => {
  const { tag } = match.params;

  return(
    <div className="content-wrapper">
      <AsideContainer
        items={[
          {
            link: '/write',
            icon: 'create',
            label: '글 쓰기',
          }
        ]}
        user={getCookie('user').currentUser}
      />
      <PostListContainer tag={tag}/>
    </div>
  );
}

export default Post;