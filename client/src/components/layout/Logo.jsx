import React from "react";
import { Link } from "react-router-dom";

import "components/layout/Logo.css";

const Logo = (props) => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div id={props.isMobile ? "logo-mobile" : "logo"}>
        <div id="logop1">food</div>
        <div id="logop2">MOOD</div>
      </div>
    </Link>
  );
};

export default Logo;
