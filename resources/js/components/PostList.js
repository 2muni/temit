import React from 'react'

const PostList = ({ list }) => (
  <div className="postcard-list">
    {list.map((post) => (
      <div key={post.id} className="postcard">
        {post.title}
      </div>
    ))}
  </div>
)

export default PostList;