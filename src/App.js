import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import "./App.css";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ChatWindow from "./components/ChatWindow";

const BasicExample = () =>
  <Router>
    <div>
      <Header />
      <Segment padded className="main">
        <Route exact path="/" component={Dashboard} />
        <Route path="/chat" component={ChatWindow} />
      </Segment>
    </div>
  </Router>;
export default BasicExample;
