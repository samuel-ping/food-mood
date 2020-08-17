import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <>
      <div className="navbar-wrapper">
        <div className="navbar-logo-wrapper">
          <Logo isNavbarLogo="true" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
