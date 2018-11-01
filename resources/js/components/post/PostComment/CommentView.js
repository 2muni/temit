import React, { Fragment } from 'react';

const ViewMore = ({
  replies,
  view_reply,
  handleView
}) => (
  <Fragment>
  {!view_reply ? 
    replies.length > 0 ? 
      <span className="replies-button" data-label="replies" onClick={handleView}>{replies.length}개의 답글</span> :
      <span className="replies-button" data-label="replies" onClick={handleView}>답글 달기</span> :
    <span className="replies-button" onClick={handleView}>숨기기</span>}
  </Fragment>
)

export default ViewMore;