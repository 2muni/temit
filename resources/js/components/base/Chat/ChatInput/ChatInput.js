import React from 'react'

const ChatInput = ({
  value,
  onKeyUp,
  onKeyDown,
  onKeyPress,
  onChange,
}) => (
  <div className="chat-input">
    <textarea
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder="메시지를 입력하세요..."
      autoFocus
    />
  </div>
)

export default ChatInput