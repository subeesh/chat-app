import React, { Component } from "react";
import { Segment, Card } from "semantic-ui-react";
import io from "socket.io-client";

import RecentActivity from "./RecentActivity";

const SERVER_URL = "http://localhost:9000";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleInfo = this.handleInfo.bind(this);
    this.handleFeed = this.handleFeed.bind(this);

    this.state = {
      items: [],
      feeds: []
    };
  }

  componentDidMount() {
    this.socket = io(SERVER_URL);
    this.socket.on("info", this.handleInfo);
    this.socket.on("feed", this.handleFeed);
  }

  componentWillUnmount() {
    this.socket.off("info", this.handleInfo);
  }

  handleInfo(message) {
    const items = [
      { header: "Total Users", description: message.totalUsers },
      { header: "Total Messages", description: message.totalUsers }
    ];
    this.setState({
      items
    });
    console.log(message);
  }

  handleFeed(message) {
    const { feeds } = this.state;
    feeds.push(message);
    this.setState({
      feeds
    });
  }

  render() {
    const { items, feeds } = this.state;
    return (
      <Segment className="dashboard">
        <h1>Dashboard</h1>
        <Card.Group items={items} />
        <RecentActivity feeds={feeds} />
      </Segment>
    );
  }
}

export default Dashboard;
