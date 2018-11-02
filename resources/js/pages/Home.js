import React from 'react';
import SnapshotContainer from '../containers/snapshot/SnapshotContainer'

const Post = ({ match }) => {
  const { id } = match.params;

  return(
    <div className="snapshot-wrapper">
      <SnapshotContainer/>
    </div>
  );
}

export default Post;