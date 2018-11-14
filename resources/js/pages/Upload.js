import React from 'react';
import UploadContainer from '../containers/snapshot/UploadContainer'
import AsideContainer from '../containers/base/AsideContainer'
import { getCookie } from '../lib/cookie'

const Post = ({ match }) => {
  const { state } = match.params;

  return(
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
      <UploadContainer
        state={state}
        user={getCookie('user').currentUser}
      />
    </div>
  )
}

export default Post;