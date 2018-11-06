import React from 'react'
import { Link } from  'react-router-dom'

const Header = ({
  handleLogout,
}) => (
  <header>
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">temit</Link>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li><Link to='/board'>게시판</Link></li>
          <li><Link to='/login' onClick={handleLogout}>로그아웃</Link></li>
        </ul>
      </div>
    </nav>
    <ul className="sidenav" id="mobile-demo">
      <li><Link to='/login' onClick={handleLogout}>로그아웃</Link></li>
    </ul>
  </header>
)

export default Header;