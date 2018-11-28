import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import axios from 'axios'
import { produce } from 'immer'

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      input: '',
    }

    this.endpoint = `/api/channels/${this.props.room}/messages`
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log("room", this.props.room)
    console.log("otherUser", this.props.otherPerson)

    const socket = socketIOClient(`http://localhost:3000`);

    socket.on(`${this.props.room}:App\\Events\\MessageSent`, data => {
      this.setState(produce(this.state, draft => {
        draft.messages.push(data.data)
      }))
    })
      
    axios.get(this.endpoint)
      .then(({ data }) => this.setState(produce(this.state, draft => {
        draft.messages = data;
      })))
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.messages !== this.state.messages) {
      const { scrollTop, scrollHeight } = document.querySelector('.chat-body');
      return { scrollTop, scrollHeight };
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      const { scrollTop } = document.querySelector('.chat-body');
      if (scrollTop !== snapshot.scrollTop) return; // 기능이 이미 구현되어있다면 처리하지 않습니다.
      const diff = document.querySelector('.chat-body').scrollHeight - snapshot.scrollHeight;
      document.querySelector('.chat-body').scrollTop += diff;
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }

  handleSubmit(e) {
    if(e.key === 'Enter') {
      const message = new FormData();
      message.append('username', 'testuser')
      message.append('message', this.state.input)
      axios.post(this.endpoint, message)
        .then(() => this.setState({ input: '' }))
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
        {this.state.messages.map((message, i) => (
          <p key={i} style={{ background: "#000" }}>
            <span className="datetime" style={{ color: "turquoise" }}>{ message.created_at }</span>
            <span className="username" style={{ color: "green" }}>{ message.name }</span>
            <span className="message-text" style={{ color: "white" }}>{ message.body }</span>
          </p>
        ))}
        </div>

        <div className="chat-input">
          <input type="text"
            value={this.state.input}
            onChange={this.handleChange}
            onKeyPress={this.handleSubmit}
            placeholder="메시지를 입력하세요..."
            autoFocus
          />
        </div>

      </div>
    )
  }
}

export default ChatContainer;