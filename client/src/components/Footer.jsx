import React from "react";
import "./Footer.css";
import { IconContext } from "react-icons";
import {
  AiFillGithub as GithubIcon,
  AiFillLinkedin as LinkedInIcon,
} from "react-icons/ai";

const Footer = (props) => {
  return (
    <>
      <div className="footer-wrapper">
        <div className="my-information">
          Made by Samuel Ping | Powered by AWS and Yelp{" "}
        </div>
        <div className="icons-bar">
          <IconContext.Provider
            value={{
              className: props.isMobile ? "react-icons-mobile" : "react-icons",
            }}
          >
            <a
              className="a-link"
              href="https://github.com/samuel-ping/food-mood"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
            </a>

            <a
              className="a-link"
              href="https://linkedin.com/in/samuelping"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </a>
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
};

export default Footer;
