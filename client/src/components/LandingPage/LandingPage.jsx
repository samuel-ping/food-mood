import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo";
import Description from "../Description";
import Button from "../Button";
import "./LandingPage.css";
import "typeface-pacifico";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing">
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
            <Button isGetStarted="true" buttonText="Get Started" />
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
