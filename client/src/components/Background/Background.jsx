import React, { Component } from "react";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import BackgroundImage from "react-image";
import BackgroundImageBank from "./BackgroundImagesBank";
import "./Background.css";

const override = css`
  margin: 40vh 45vw;
`;

class Background extends Component {
  render() {
    return (
      <BackgroundImage
        id="background-wrapper"
        src={BackgroundImageBank[this.props.backgroundImage]}
        loader={
          <HashLoader
            css={override}
            size={150}
            color={"red"}
            // loading={this.state.loading}
          />
        }
      />
    );
  }
}

export default Background;
