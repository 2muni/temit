import React from 'react'
import { Link } from  'react-router-dom'
import { Icon } from 'react-materialize'

const lavels = [
  'notifications', 'message', 'people'
]

const pointer = menu => {
  let position = 19;
  const space = 54;
  
  switch(menu) {
    case lavels[2]  : return position+space*2;
    case lavels[1]  : return position+space*1;
    default         : return position+space*0;
  }
}

const Header = ({
  currentMenu,
  handleMenu,
  handleLogout,
}) => (
  <header>
    <nav>
      <Link to="/" className="logo">temit</Link>
      <ul>
        <li><Link to='/board'>게시판</Link></li>
        <li><Link to='/project'>프로젝트</Link></li>
        <li onClick={handleMenu}>
          <i style={ currentMenu === lavels[2] ? { color:'#fff' } : {}}
             className="material-icons dropbtn" 
          >{lavels[2]}</i>
        </li>
        <li onClick={handleMenu}>
          <i style={ currentMenu === lavels[1] ? { color:'#fff' } : {}}
             className="material-icons dropbtn" 
          >{lavels[1]}</i>
        </li>
        <li onClick={handleMenu}>
          <i style={ currentMenu === lavels[0] ? { color:'#fff' } : {}}
             className="material-icons dropbtn" 
          >{lavels[0]}</i>
          <div style={ currentMenu ? {} : { display: 'none' }}
          className="menu-wrapper">
            <div className="menu-positioner">
              <div className="menu-pointer"
                style={{right: `${pointer(currentMenu)}px`}}/>
              <div className="menu">
                <div>{currentMenu}_1</div>
                <div>{currentMenu}_2</div>
                <div>{currentMenu}_3</div>
              </div>
            </div>
          </div>
        </li>
        <li><a href='/login' onClick={handleLogout}>로그아웃</a></li>
      </ul>
    </nav>
  </header>
)

export default Header;