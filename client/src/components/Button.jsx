import React, { Component } from "react";
import {
  FaLongArrowAltRight as ArrowIcon,
  FaFileImage as ImageIcon,
} from "react-icons/fa";
import "./Button.css";

/* Takes three possible props:
    1. isGetStarted
    2. isUpload
    3. buttonText */

class Button extends Component {
  render() {
    return (
      <div className="button">
        {this.props.isImage ? <ImageIcon /> : ""}
        {this.props.buttonText}
        {this.props.isGetStarted ? <ArrowIcon /> : ""}
      </div>
    );
  }
}

export default Button;
