import React, { Component } from "react";
import Logo from "./Logo";
import Button from "./Button";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Logo isNavbarLogo="true" />
        <div id="navbar-right-side">
          <Button isGitHub="true" />
        </div>
      </div>
    );
  }
}

export default Navbar;
