import React from 'react'
import { Link } from  'react-router-dom'
import { Icon } from 'react-materialize'

import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(koreanStrings)

const lavels = [
  'notifications', 'people'
]

const pointer = menu => {
  let position = 19;
  const space = 54;
  
  switch(menu) {
    case lavels[1]  : return position+space*1;
    default         : return position+space*0;
  }
}

const DropMenu = ({
  menu,
  notifications,
}) => {
  switch(menu) {
    case lavels[1]  : return (
      <div className="menu">
        <div className="header">친구 요청</div>
        <div className="list">
        {notifications.map((item, i) => (
          item.type==='FOLLOW' &&
          <div key={i} className="menu-item">
            <img className="circle" src={item.user.thumbnail}/>
            <div className="message">
              <div className="body">{item.user.name}님이 친구요청을 하였읍니다.</div>
              <div className="date"><TimeAgo date={item.created_at} formatter={formatter} /></div>
            </div>
          </div>   
        ))}
        </div>
      </div>  
    );
    default         : return (
      <div className="menu">
        <div className="header">알림</div>
        <div className="list">
        {notifications.map((item, i) => {
          switch(item.type) {
            case 'POST' : return (
              <div key={i} className="menu-item">
                <img className="circle" src={item.user.thumbnail}/>
                <div className="message">
                  <div className="body">{item.user.name}님이 새로운 게시글을 작성하였습니다.</div>
                  <div className="date"><TimeAgo date={item.created_at} formatter={formatter} /></div>
                </div>
              </div>            
            );
            case 'SNAPSHOT' : return (
              <div key={i} className="menu-item">
                <img className="circle" src={item.user.thumbnail}/>
                <div className="message">
                  <div className="body">{item.user.name}님이 새로운 스냅샷을 추가하였습니다.</div>
                  <div className="date"><TimeAgo date={item.created_at} formatter={formatter} /></div>
                </div>
              </div>            
            );
            case 'POST_COMMENT': return (
              <div key={i} className="menu-item">
                <img className="circle" src={item.user.thumbnail}/>
                <div className="message">
                  <div className="body">{item.user.name}님이 게시글에 댓글을 남겼습니다.</div>
                  <div className="date"><TimeAgo date={item.created_at} formatter={formatter} /></div>
                </div>
              </div>            
            );
            case 'SNAPSHOT_COMMENT' : return (
              <div key={i} className="menu-item">
                <img className="circle" src={item.user.thumbnail}/>
                <div className="message">
                  <div className="body">{item.user.name}님이 스냅샷에 댓글을 남겼습니다.</div>
                  <div className="date"><TimeAgo date={item.created_at} formatter={formatter} /></div>
                </div>
              </div>            
            );
          }
        })}
        </div>
      </div>  
    );
  }
}

const Header = ({
  currentMenu,
  handleMenu,
  handleLogout,
  notifications
}) => (
  <header>
    <nav>
      <Link to="/" className="logo">temit</Link>
      <ul>
        <li><Link to='/board'>게시판</Link></li>
        <li><Link to='/project'>프로젝트</Link></li>
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
              <div className="menu-pointer" style={{right: `${pointer(currentMenu)}px`}}/>
              <DropMenu
                menu={currentMenu}
                notifications={notifications}
              />
            </div>
          </div>
        </li>
        <li><a href='/login' onClick={handleLogout}>로그아웃</a></li>
      </ul>
    </nav>
  </header>
)

export default Header;