import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import axios from 'axios'
import { produce } from 'immer'
import { ChatHead } from '../../components/base/Chat/ChatHead'
import { ChatBody } from '../../components/base/Chat/ChatBody'
import { ChatInput } from '../../components/base/Chat/ChatInput'

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      input: '',
    }

    this.endpoint = `/api/channels/${this.props.room}/messages`
    this.receiveMessages = this.receiveMessages.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  receiveMessages() {
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

  componentDidMount() {
    axios.post('/api/channels', { room: this.props.room })
      .then(() => this.receiveMessages())
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if(prevState.messages !== this.state.messages) {
      const { scrollTop, scrollHeight } = document.querySelector('.chat-body');
      return { scrollTop, scrollHeight };
    }else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      const { scrollTop } = document.querySelector('.chat-body');
      if (scrollTop !== snapshot.scrollTop) return;
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
      message.append('user_id', this.props.currentUser.id)
      message.append('body', this.state.input)
      axios.post(this.endpoint, message)
        .then(() => this.setState({ input: '' }))
    }
  }

  render() {
    return(
      <div className="chat-warpper"
        style={{left: `${290+295*this.props.index}px`}}>
        <ChatHead
          otherPerson={this.props.otherPerson}
        />
        <ChatBody
          otherPerson={this.props.otherPerson}
          messages={this.state.messages}
        />
        <ChatInput
          value={this.state.input}
          onChange={this.handleChange}
          onKeyPress={this.handleSubmit}
        />
      </div>
    )
  }
}

export default ChatContainer;