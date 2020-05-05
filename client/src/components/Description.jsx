import React, { Component } from "react";
import "./Description.css";

class Description extends Component {
  render() {
    return (
      <div className="description-wrapper">
        <h3>{this.props.descriptionText}</h3>
      </div>
    );
  }
}

export default Description;
