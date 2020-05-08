import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Background from "../Background/Background";
import Logo from "../Logo";
import Description from "../Description";
import Button from "../Button";
import "./LandingPage.css";
import "typeface-pacifico";

class LandingPage extends Component {
  render() {
    if (isMobile) {
      alert(
        "Just a warning, this app has not been optimized for mobile use yet."
      );
    }
    return (
      <div className="landing">
        <div id="landing-background">
          <Background
            backgroundImage="pastaImage"
            placeholderImage="tinyPastaImage"
          />
        </div>
        <div className="logo-wrapper">
          <Logo isLandingLogo="true" />
        </div>
        <div className="description-wrapper">
          <Description
            descriptionText="This web app uses your photo and based on your visible mood, suggests
          a nearby restaurant for you!"
          />
        </div>
        <div className="button-wrapper">
          <Link to="/input-photo" style={{ textDecoration: "none" }}>
            <Button
              isGetStarted="true"
              buttonText="Get Started"
              isActivated="true"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
