import React  from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'react-materialize'

const AsideNav = ({
  isFixed,
  user,
  followees,
}) => (
  <aside className="aside-nav">
    <div className="fixed-frame" style={ isFixed ? {position: 'fixed', top: '11px'} : {position: 'static'} }>
      <div className="user-profile">
        <div className="user-img-0">
          <Link to={`/users/${user.id}`}><img className="circle" alt={user.name} src={user.thumbnail} /></Link>
        </div>
        <Link to={`/users/${user.id}`}><div className="user-name">{user.name}</div></Link>
      </div>
      <ul className="aside-navitem">
      {followees.map((item, i)=>(
        <li key={i}>
          <img className="circle" alt={item.name} src={item.thumbnail} />
          <span className="followee-name">{`${item.name}`}</span>
        </li>
      ))}
      </ul>
    </div>
  </aside>
)

export default AsideNav;