import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(koreanStrings)

// const thumbnail = ({
//   userId
// }) => (
//  /* User Thumbnail logic */
// )

const ChatBody = ({
  messages,
  otherPerson
}) => (
  <div className="chat-body">
  {messages.map((message, i) => (
    <div className="message" key={i}>
      <Link to={`/users/${otherPerson.id}`}>
        <img className="circle" alt={otherPerson.name} src={otherPerson.thumbnail} />
      </Link>
      <div>
        <div className="message-text">{ message.body }</div>
        <div className="date">
          <TimeAgo date={message.created_at} formatter={formatter} />
        </div>
      </div>
    </div>
  ))}
  </div>
)

export default ChatBody