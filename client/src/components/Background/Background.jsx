import React, { Component } from "react";
import BackgroundImage from "react-image";
import BackgroundImageBank from "./BackgroundImagesBank";
import "./Background.css";

class Background extends Component {
  render() {
    return (
      <BackgroundImage
        id="background-wrapper"
        src={BackgroundImageBank[this.props.backgroundImage]}
        loader={
          <BackgroundImage
            src={BackgroundImageBank[this.props.placeholderImage]}
          />
        }
      />
    );
  }
}

export default Background;
