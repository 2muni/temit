import React from 'react'

const ChatInput = ({
  value,
  onChange,
  onKeyPress
}) => (
  <div className="chat-input">
    <input type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder="메시지를 입력하세요..."
      autoFocus
    />
  </div>
)

export default ChatInput