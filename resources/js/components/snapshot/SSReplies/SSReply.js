import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(koreanStrings)

const SSReplies = ({
  user,
  data,
  handleRemove
}) => (
  <div className="reply">
    <img className="circle" alt="user-profile" src={data.user.thumbnail}/>
    <div className="body-wrapper">
      <div className="body">
        <Link to={`/users/${data.user.id}`}>{data.user.name}</Link>{data.comment}
      </div>
      <div className="options">
        {user.id === data.user.id ?
          <div className="delete" data-user={data.user.id} data-id={data.id} onClick={handleRemove}>삭제</div> : undefined}
        <div className="date"><TimeAgo date={data.created_at} formatter={formatter}/></div>
      </div>
    </div>
  </div>
)

export default SSReplies;