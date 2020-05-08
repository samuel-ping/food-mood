import React, { Component } from "react";
import {
  FaLongArrowAltRight as ArrowIcon,
  FaFileImage as ImageIcon,
} from "react-icons/fa";
import "./Button.css";

/* Takes three possible props:
    1. isGetStarted
    2. isUpload
    3. buttonText
    4. isActivated */

class Button extends Component {
  render() {
    // conditional inline styling wasn't working for some reason :( will have to try again in the future
    if (this.props.isActivated === "false") {
      return (
        <div
          className={
            this.props.isActive === "true" ? "button" : "inactive-button"
          }
        >
          {this.props.isImage ? <ImageIcon /> : null}
          {this.props.buttonText}
          {this.props.isGetStarted ? <ArrowIcon /> : null}
        </div>
      );
    } else {
      return (
        <div className="button">
          {/* <div
         className={
           this.props.isActive === "true" ? "button" : "inactive-button"
         }
       > */}
          {this.props.isImage ? <ImageIcon /> : null}
          {this.props.buttonText}
          {this.props.isGetStarted ? <ArrowIcon /> : null}
        </div>
      );
    }
  }
}

export default Button;
