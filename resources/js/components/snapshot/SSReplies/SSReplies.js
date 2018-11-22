import React from 'react'
import { Button } from 'react-materialize'
import SSReply from './SSReply'

const SSReplies = ({
  user,
  list,
  comment,
  handleChange,
  handleSubmit,
  handleRemove,
}) => (
  <div className="snapshot-replies">
    {list.length > 0 && list.map((item, i) => (
      <SSReply
        key={i}
        data={item}
        user={user}
        handleRemove={handleRemove}
      />
    ))}
    <div className="reply">
      <img className="circle" alt="user-profile" src={user.thumbnail}/>
      <input className="body" value={comment} onChange={handleChange} placeholder="댓글을 입력하세요..." />
      <Button onClick={handleSubmit}>작성</Button>
    </div>
  </div>
)

export default SSReplies