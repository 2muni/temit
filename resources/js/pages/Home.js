import React from 'react';
import SnapshotContainer from '../containers/snapshot/SnapshotContainer'
import AsideContainer from '../containers/base/AsideContainer'

const Post = ({ match }) => {
  const { id } = match.params;

  return(
    <div className="snapshot-wrapper">
      <AsideContainer
        items={[
          {
            link: '',
            icon: 'edit',
            label: '새 스냅샷'
          }
        ]}
      />
      <SnapshotContainer/>
    </div>
  );
}

export default Post;