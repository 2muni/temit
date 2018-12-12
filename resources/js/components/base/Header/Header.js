import React from 'react'
import { Link } from  'react-router-dom'
import { Icon } from 'react-materialize'

import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(koreanStrings)

const lavels = [
  'notifications', 'message', 'people'
]

let counter = 0;

const pointer = menu => {
  let position = 19;
  const space = 54;
  
  switch(menu) {
    case lavels[2]  : return position+space*2;
    case lavels[1]  : return position+space*1;
    default         : return position+space*0;
  }
}

const ItemCounter = ({
  menu,
  notifications,
  className,
}) => {
  counter = 0;
  switch(menu) {
    case lavels[2]: return (
      <div className={className}>
        { 
          notifications.map((item) => {
            item.type==='FOLLOW' && counter++;
          })
        }
        {counter}
      </div>  
    );
    case lavels[1]: return (
      <div className={className}>
        { 
          notifications.map((item) => {
            item.type==='CHAT' && counter++;
          })
        }
        {counter}
      </div>  
    );
    default       : return (
      <div className={className}>
        { 
          notifications.map((item) => {
            (item.type !=='FOLLOW' && item.type !=='CHAT') && counter++;
          })
        }
        {counter}
      </div>  
    );
  }
}

const DropMenu = ({
  menu,
  notifications,
}) => {
  switch(menu) {
    case lavels[2]  : return (
      <div className="menu">
        <div className="header">친구 요청</div>
        <div className="list">
        {notifications.map((item, i) => (
          item.type==='FOLLOW' &&
          <div key={i} className="menu-item">
            <img className="circle" src={item.user.thumbnail}/>
            <div className="message">
              <a href={`http://temit.2muni.com/users/${item.user.id}`}>
                <div className="body">{item.user.name}님이 구독하였습니다.</div>
                <div className="date"><TimeAgo date={item.created_at} formatter={formatter} /></div>
              </a>
            </div>
          </div>   
        ))}
        </div>
      </div>  
    );
    case lavels[1]  : return (
      <div className="menu">
        <div className="header">최근 메시지</div>
        <div className="list">
        {notifications.map((item, i) => (
          item.type==='CHAT' &&
          <div key={i} className="menu-item">
            <img className="circle" src={item.user.thumbnail}/>
            <div className="message">
              <div className="body">{item.user.name}</div>
              <div>{item.source}</div>
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
                  <a href={`http://temit.2muni.com/post/${item.source}`}>
                    <div className="body">{item.user.name}님이 새로운 게시글을 작성하였습니다.</div>
                    <div className="date"><TimeAgo date={item.created_at} formatter={formatter} /></div>
                  </a>
                </div>
              </div>            
            );
            case 'SNAPSHOT' : return (
              <div key={i} className="menu-item">
                <img className="circle" src={item.user.thumbnail}/>
                <div className="message">
                  <a href={`http://temit.2muni.com/`}>
                    <div className="body">{item.user.name}님이 새로운 스냅샷을 추가하였습니다.</div>
                    <div className="date"><TimeAgo date={item.created_at} formatter={formatter} /></div>
                  </a>
                </div>
              </div>            
            );
            case 'POST_COMMENT': return (
              <div key={i} className="menu-item">
                <img className="circle" src={item.user.thumbnail}/>
                <div className="message">
                  <a href={`http://temit.2muni.com/post/${item.source}`}>
                    <div className="body">{item.user.name}님이 게시글에 댓글을 남겼습니다.</div>
                    <div className="date"><TimeAgo date={item.created_at} formatter={formatter} /></div>
                  </a>
                </div>
              </div>            
            );
            case 'SNAPSHOT_COMMENT' : return (
              <div key={i} className="menu-item">
                <img className="circle" src={item.user.thumbnail}/>
                <div className="message">
                  <a href={`http://temit.2muni.com/`}>
                    <div className="body">{item.user.name}님이 스냅샷에 댓글을 남겼습니다.</div>
                    <div className="date"><TimeAgo date={item.created_at} formatter={formatter} /></div>
                  </a>
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
        <li onClick={handleMenu}>
          <ItemCounter className={'counter'} menu={lavels[2]} notifications={notifications}/>
          <i style={ currentMenu === lavels[2] ? { color:'#fff' } : {}}
             className="material-icons dropbtn" 
          >{lavels[2]}</i>
        </li>
        <li onClick={handleMenu}>
          <ItemCounter className={'counter'} menu={lavels[1]} notifications={notifications}/>
          <i style={ currentMenu === lavels[1] ? { color:'#fff' } : {}}
             className="material-icons dropbtn" 
          >{lavels[1]}</i>
        </li>
        <li onClick={handleMenu}>
          <ItemCounter className={'counter'} menu={lavels[0]} notifications={notifications}/>
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