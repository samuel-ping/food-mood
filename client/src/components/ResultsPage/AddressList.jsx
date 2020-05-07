import React, { Component } from "react";
import "./AddressList.css";

// For parsing the array in the restaurant address
class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.bullets == null) {
      return null;
    } else {
      const bullets = this.props.bullets;
      const listItems = bullets.map((bullet) => (
        <li id="address-bullet-point">{bullet}</li>
      ));
      return <ul id="address-list">{listItems}</ul>;
    }
  }
}

export default AddressList;
