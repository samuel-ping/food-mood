import React, { Component } from "react";
import {
  FaLongArrowAltRight as ArrowIcon,
  FaFileImage as ImageIcon,
  FaGithub as GitHubIcon,
} from "react-icons/fa";
import Tooltip from "react-tooltip";
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
        <div className="inactive-button">
          {this.props.isImage ? <ImageIcon /> : null}
          {this.props.buttonText}
          {this.props.isGetStarted ? <ArrowIcon /> : null}
        </div>
      );
    } else if (this.props.isGitHub) {
      return (
        <div>
          <a
            id="github-button-wrapper"
            href="https://github.com/samuel-ping/food-mood"
            target="_blank"
            rel="noopener noreferrer"
            data-tip="Check me out on GitHub!"
          >
            {this.props.isGitHub ? <GitHubIcon /> : null}
          </a>
          <Tooltip place="left" type="light" effect="solid" />
        </div>
      );
    } else {
      return (
        <div className="button">
          {this.props.isImage ? <ImageIcon /> : null}
          {this.props.buttonText}
          {this.props.isGetStarted ? <ArrowIcon /> : null}
        </div>
      );
    }
  }
}

export default Button;
