import React, { useState } from "react";
import BackgroundImage from "react-image";
import BackgroundImageBank from "./BackgroundImagesBank";
import "./Background.css";

const Background = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <img
        className="image thumbnail"
        src={BackgroundImageBank[props.placeholderImage]}
        alt=""
        style={{ visibility: isLoaded ? "hidden" : "visible" }}
      ></img>
      <img
        onLoad={() => {
          setIsLoaded(true);
        }}
        className="image full"
        src={BackgroundImageBank[props.backgroundImage]}
        alt=""
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </>
  );
};

export default Background;
