import React, { Component } from "react";
import "./Description.css";

class Description extends Component {
  render() {
    return (
      <div className="description-wrapper">
        <h3>
          This web app uses your photo and based on your visible mood, suggests
          a nearby restaurant for you!
        </h3>
      </div>
    );
  }
}

export default Description;
