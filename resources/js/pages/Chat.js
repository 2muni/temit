import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import axios from 'axios'
import { produce } from 'immer'

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: (current, target) => `/api/channels/${current*target}/messages`,
      channels: [
        420, 462, 440
      ],
      messages: [],
      input: '',
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const socket = socketIOClient(`http://localhost:3000`);

    for(let channel in this.state.channels) {
      const room = this.state.channels[channel]
      console.log(room)
      socket.on(`${room}:App\\Events\\MessageSent`, data => {
            this.setState(produce(this.state, draft => {
              draft.messages.push(data.data)
            }))
        })
    }

    axios.get(this.state.endpoint(21, 22))
      .then(({ data }) => this.setState(produce(this.state, draft => {
        draft.messages = data;
      })))
    
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }
  handleSubmit() {
    const message = new FormData();
    message.append('username', 'testuser')
    message.append('message', this.state.input)
    axios.post(this.state.endpoint(21, 22), message)
  }

  render() {
    return (
      <div style={{ 'overflow-y': "auto" }}>
      {this.state.messages.map((message, i) => (
        <p key={i} style={{ background: "#000" }}>
          <span class="datetime" style={{ color: "turquoise" }}>{ message.created_at }</span>
          <span class="username" style={{ color: "green" }}>{ message.name }</span>
          <span class="message-text" style={{ color: "white" }}>{ message.body }</span>
        </p>
      ))}
        <input type="text" value={this.state.input} onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>제출</button>
      </div>
    );
  }
}

export default Chat;