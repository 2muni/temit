import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'react-materialize'

const PostNav = ({
  isFixed,
  user
}) => (
  <div className="post-nav left">
    {console.log('render')}
    <div className="fixed-frame" style={ isFixed ? {position: 'fixed', top: '11px'} : {position: 'static'} }>
      <div className="user-profile">
        <div className="user-img-0">
          <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
        </div>
        <div className="user-name">{user.username}</div>
      </div>
      <ul className="post-navitem">
        <li><Link to="/write"><Icon>edit</Icon>글 쓰기</Link></li>
      </ul>
    </div>
  </div>
)

export default PostNav