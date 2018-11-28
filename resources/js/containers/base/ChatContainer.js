import React, { Component } from 'react';

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <div className="chat-warpper"
        style={{left: `${290+295*this.props.index}px`}}>

        <div className="chat-header">
          <div className="username">username</div>
          <div className="close">&times;</div>
        </div>

        <div className="chat-body">

        </div>

        <div className="chat-input">
          <input type="text" placeholder="메시지를 입력하세요..." autoFocus/>
        </div>

      </div>
    )
  }
}

export default ChatContainer;