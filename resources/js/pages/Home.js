import React from 'react';
import SnapshotContainer from '../containers/snapshot/SnapshotContainer'
import AsideContainer from '../containers/base/AsideContainer'

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
      />
      <SnapshotContainer
        state={state}
      />
    </div>
  );
}

export default Post;