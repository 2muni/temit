import React from 'react'
import { Link } from 'react-router-dom'

const PostNav = ({
  user
}) => (
  <div className="post-nav left">
    <div className="user-profile">
      <div className="user-img-0">
        <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
      </div>
      <div className="user-name">{user.username}</div>
    </div>
    <div className="post-navitem">
      <Link to="/write">글쓰기</Link>
    </div>
  </div>
)

export default PostNav