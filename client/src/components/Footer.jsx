import React from "react";
import "./Footer.css";
import { IconContext } from "react-icons";
import { AiFillGithub as GithubIcon } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div className="footer-wrapper">
        <div className="my-information">Made by Samuel Ping |</div>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <a
            className="github-link"
            href="https://github.com/samuel-ping/food-mood"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
        </IconContext.Provider>
      </div>
    </>
  );
};

export default Footer;
