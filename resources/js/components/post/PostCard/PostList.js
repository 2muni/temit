import React from 'react';
import { CardContent, CardThumbnail } from './'

const PostList = ({ list }) => (
  <div className="postcard-list">
  {list.map((post, i) => (
    <div key={i} className="postcard">
      <CardThumbnail post={post}/>
      <CardContent post={post}/>
    </div>))}
  </div>
)

export default PostList;
