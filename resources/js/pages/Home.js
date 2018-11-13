import React from 'react';
import SnapshotContainer from '../containers/snapshot/SnapshotContainer'
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
      <SnapshotContainer
        state={state}
        user={getCookie('user').currentUser}
      />
    </div>
  )
  else return (<div></div>)
}

export default Post;