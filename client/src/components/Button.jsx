import React, { Component } from "react";
import { FaLongArrowAltRight as ArrowIcon } from "react-icons/fa";
import "./Button.css";

class Button extends Component {
  render() {
    return (
      <div className="button">
        {this.props.buttontext}
        <ArrowIcon />
      </div>
    );
  }
}

export default Button;
