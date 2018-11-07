import React from 'react';
import PostListContainer from '../containers/post/PostListContainer'
import AsideContainer from '../containers/base/AsideContainer'

const Post = ({ match }) => {
  const { tag } = match.params;

  return(
    <div className="content-wrapper">
      <AsideContainer
        items={[
          {
            link: '/write',
            icon: 'edit',
            label: '글 쓰기',
          }
        ]}
      />
      <PostListContainer tag={tag}/>
    </div>
  );
}

export default Post;