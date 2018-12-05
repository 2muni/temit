import React from 'react'

const ChatHead = ({
  roomIndex,
  otherPerson,
  quitChatRoom
}) => (
  <div className="chat-header">
    <div className="username">{otherPerson.name}</div>
    <div className="close"
      onClick={quitChatRoom}
      data-room={`${roomIndex}`}>&times;</div>
  </div>
)

export default ChatHead