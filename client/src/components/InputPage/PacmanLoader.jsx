import React from "react";
import { css } from "@emotion/core";
import SpinnersPacmanLoader from "react-spinners/PacmanLoader";
import { usePromiseTracker } from "react-promise-tracker";
import "./PacmanLoader.css";

const override = css`
  -webkit-transform: translateX(-10vw);
  -ms-transform: translateX(-10vw);
  transform: translateX(-10vw);
`;

const PacmanLoader = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <div id="loader-wrapper">
      {promiseInProgress === true ? (
        <div>
          <SpinnersPacmanLoader css={override} size={120} color={"#ffffff"} />
          <div id="loading-text">
            Loading your restaurant recommendations...
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PacmanLoader;
