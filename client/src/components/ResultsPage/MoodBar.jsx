import React, { Component } from "react";
import "./MoodBar.css";

class MoodBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mood-bar-wrapper">
        <div id="mood-bar-text">
          <div id="mood-text-1">You appear to be:</div>
          <div id="mood-text-2">{this.props.mood}</div>
        </div>
      </div>
    );
  }
}

export default MoodBar;
