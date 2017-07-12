import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

export default class Header extends Component {
  render() {
    return (
      <Menu icon="labeled" size="tiny">
        <Menu.Item name="dashboard" as={Link} to="/">
          <Icon name="home" />
          Dashboard
        </Menu.Item>
        <Menu.Item name="chat" as={Link} to="/chat">
          <Icon name="chat" />
          Chat
        </Menu.Item>
      </Menu>
    );
  }
}
