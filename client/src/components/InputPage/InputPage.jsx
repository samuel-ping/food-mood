import React, { Component } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Description from "../Description";
import Button from "../Button";
import "./InputPage.css";

class InputPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      base64encode: 0,
    };
  }

  render() {
    return (
      <div className="input-page-wrapper">
        <Navbar />
        <div className="description-wrapper-2">
          <Description descriptionText="First, make sure you allow this app to access your location. Then, either take a photo of yourself (and whoever you're with!) or browse your local files for one. Once you upload it, give the app a few seconds, and your restaurant recommendation will be shown!" />

          <div className="button-wrapper-2">
            <label htmlFor="userphoto">
              <Button isImage="true" buttonText="Browse Photos" />
            </label>
            <input id="userphoto" type="file" accept="image/*" />

            <label htmlFor="photo-submission">
              <Button buttonText="Get a restaurant!" />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default InputPage;
