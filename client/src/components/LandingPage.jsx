import React, { Component } from "react";
import Logo from "./Logo";
import Description from "./Description";
import Button from "./Button";
import "./LandingPage.css";
import "typeface-pacifico";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing">
        <div id="background-image" />
        <Logo />
        <Description />
        <div className="button-wrapper">
          <Button buttontext="Get Started" />
        </div>
      </div>
    );
  }
}

export default LandingPage;
