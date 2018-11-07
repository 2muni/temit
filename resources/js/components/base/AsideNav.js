import React  from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'react-materialize'

const AsideNav = ({
  isFixed,
  user,
  items
}) => (
  <aside className="aside-nav">
    <div className="fixed-frame" style={ isFixed ? {position: 'fixed', top: '11px'} : {position: 'static'} }>
      <div className="user-profile">
        <div className="user-img-0">
          <img className="circle" alt="user-profile" src="https://s3.ap-northeast-2.amazonaws.com/temit.s3/default-user-img-profile.jpg"/>
        </div>
        <div className="user-name">{user.name}</div>
      </div>
      <ul className="aside-navitem">
      {items.map((item, i)=>(
        <li key={i}><Link to={`${item.link}`}><Icon>{`${item.icon}`}</Icon>{`${item.label}`}</Link></li>
      ))}
      </ul>
    </div>
  </aside>
)

export default AsideNav;