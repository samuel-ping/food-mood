import React, { Component } from "react";
import Logo from "./Logo";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Logo isNavbarLogo="true" />
      </div>
    );
  }
}

export default Navbar;
