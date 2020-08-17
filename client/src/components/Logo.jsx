import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Logo.css";

/* There are two types of logos in this web app: the big landing page logo, and the small navbar logo. Thus, this component takes two props:
1. isLandingLogo
2. isNavbarLogo */

class Logo extends Component {
  render() {
    return (
      <Link to="/" style={{ textDecoration: "none" }}>
        {this.props.isLandingLogo ? (
          <div id="logo">
            <div id="logop1">food</div>
            <div id="logop2">MOOD</div>
          </div>
        ) : (
          ""
        )}
        {this.props.isNavbarLogo ? (
          <div id="logo" style={{ fontSize: "4vw" }}>
            <div id="logop1">food</div>
            <div id="logop2">MOOD</div>
          </div>
        ) : (
          ""
        )}
      </Link>
    );
  }
}

export default Logo;
