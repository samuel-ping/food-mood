import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Logo.css";

class Logo extends Component {
  render() {
    return (
      <Router>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div id="logo">
            <div id="logop1">food</div>
            <div id="logop2">MOOD</div>
          </div>
        </Link>
      </Router>
    );
  }
}

export default Logo;
