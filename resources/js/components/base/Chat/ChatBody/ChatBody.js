import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(koreanStrings)

const ChatBody = ({
  roomIndex,
  messages,
  otherPerson
}) => (
  <div className="chat-body" id={`chat-body${roomIndex}`}>
  {messages.map((message, i) => {
    if(message.user_id === otherPerson.id)
      return(
        <div key={i} className="message">
          <Link to={`/users/${otherPerson.id}`}>
            <img className="circle thumbnail" alt={otherPerson.name} src={otherPerson.thumbnail} />
          </Link>
          <div className="message-body">
            <div className="message-text">{ message.body }</div>
            <div className="date">
              <TimeAgo date={message.created_at} formatter={formatter} />
            </div>
          </div>
        </div>
      )
    else
      return(
        <div key={i} className="message" style={{ 'flexDirection': 'row-reverse' }}>
          <Link to={`/users/${message.user.id}`}>
            <img className="circle thumbnail" alt={message.user.name} src={message.user.thumbnail} />
          </Link>
          <div className="message-body" style={{ 'alignItems': 'flex-end' }}>
            <div className="message-text">{ message.body }</div>
            <div className="date">
              <TimeAgo date={message.created_at} formatter={formatter} />
            </div>
          </div>
        </div>
      )
    }
  )}
  </div>
)

export default ChatBody