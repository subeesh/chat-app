import React, { Component } from "react";
import { Container, Form, Button } from "semantic-ui-react";

import Message from "./Message";

import io from "socket.io-client";

const SERVER_URL = "http://localhost:9000";

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      allMessages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }
  componentDidMount() {
    this.socket = io(SERVER_URL);
    this.socket.on("chat message", this.handleMessage);
  }

  handleMessage(message) {
    const { allMessages } = this.state;
    allMessages.push(message);
    this.setState({
      allMessages
    });
  }

  handleChange(e, { value }) {
    this.setState({
      message: value
    });
  }

  handleSubmit(event) {
    const { message } = this.state;
    if (this.socket) {
      this.socket.emit("chat message", message);
      this.setState({
        message: ""
      });
    }
  }

  render() {
    const { message } = this.state;
    return (
      <Container fluid>
        {this.state.allMessages.map(message =>
          <Message key={Math.random() * 1000} message={message} />
        )}
        <Form reply onSubmit={this.handleSubmit}>
          <Form.TextArea
            name="message"
            placeholder="Enter Message"
            value={message}
            onChange={this.handleChange}
          />
          <Button
            content="Send"
            labelPosition="left"
            icon="send"
            primary
            disabled={!this.state.message}
          />
        </Form>
      </Container>
    );
  }
}

export default ChatWindow;
