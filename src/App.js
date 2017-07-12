import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ChatWindow from "./components/ChatWindow";

const BasicExample = () =>
  <Router>
    <div className="app">
      <Header />
      <div className="main">
        <Route exact path="/" component={Dashboard} />
        <Route path="/chat" component={ChatWindow} />
      </div>
    </div>
  </Router>;
export default BasicExample;
