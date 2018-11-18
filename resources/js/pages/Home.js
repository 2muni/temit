import React from 'react';
import HomeContainer from '../containers/home/HomeContainer'
import AsideContainer from '../containers/base/AsideContainer'
import { getCookie } from '../lib/cookie'

const Post = ({ match }) => {
  const { state } = match.params;

  if(getCookie('user'))return(
    <div className="snapshot-wrapper">
      <AsideContainer
        items={[
          {
            link: '',
            icon: 'create',
            label: '새 스냅샷'
          }
        ]}
        user={getCookie('user').currentUser}
      />
      <HomeContainer
        state={state}
        user={getCookie('user').currentUser}
      />
    </div>
  )
  else return (<div></div>)
}

export default Post;