import React, { Component } from "react";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

import io from "socket.io-client";

const SERVER_URL = "http://localhost:9000";

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      nickNameChanged: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount() {
    this.socket = io(SERVER_URL);
    this.socket.on("chat message", this.handleMessage);
    this.socket.on("server message", this.handleMessage);
  }

  handleMessage(message) {
    let { messages } = this.state;
    messages.push(message);
    this.setState({
      messages
    });
  }

  handleChange(e, { value }) {
    this.setState({
      message: value
    });
  }

  handleSubmit(event) {
    const { message, nickNameChanged } = this.state;
    if (this.socket) {
      if (nickNameChanged) {
        this.socket.emit("chat message", message);
      } else {
        this.socket.emit("change nickname", message);
        this.setState({
          nickNameChanged: true
        });
      }
      this.setState({
        message: ""
      });
    }
  }

  render() {
    const { messages, message, nickNameChanged } = this.state;
    return (
      <div className="container">
        <div className="message-list">
          {messages.map(message =>
            <ChatMessage message={message} key={message.date} />
          )}
        </div>

        <ChatInput
          message={message}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          placeholder={
            !nickNameChanged ? "Enter your nick name" : "Start typing"
          }
        />
      </div>
    );
  }
}

export default ChatWindow;
