import React, { Fragment } from 'react'
import { Button } from 'react-materialize'

const handleHeight = (e) => {
  e.target.style.height = '120px';
  e.target.style.height = (e.target.scrollHeight)+"px";
}
const handleFocus = (e) => {
  e.target.style.minHeight = '120px';
  e.target.rows = '4';
}
const handleBlur = (e) => {
  if(e.target.value) {
    e.target.style.minHeight = '120px';
    e.target.rows = '4';
  }
  else{
    e.target.style.height = '53px';
    e.target.style.minHeight = '0';
    e.target.rows = '1';
  }
}

const CommentInput = ({ 
  value,
  handleChange,
  handleCommentSubmit,
}) => (
  <Fragment>
    <textarea rows="1" style={{ height: '53px' }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleHeight}
      onChange={handleChange}
      value={value}
    />
    <div className="btn-wrapepr">
      <Button onClick={ handleCommentSubmit }>댓글 작성</Button>
    </div>
  </Fragment>
)

export default CommentInput