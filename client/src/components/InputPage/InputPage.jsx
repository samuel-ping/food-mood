import React, { Component } from "react";
import axios from "axios";
import ImgToBase64 from "image-to-base64";
import Navbar from "../Navbar";
import Description from "../Description";
import Button from "../Button";
import "./InputPage.css";

class InputPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      base64encode: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ file: event.target.files[0] });
    ImgToBase64(URL.createObjectURL(this.state.file))
      .then((response) => {
        console.log(response); //cGF0aC90by9maWxlLmpwZw==
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="input-page-wrapper">
        <Navbar />
        <div className="description-wrapper-2">
          <Description descriptionText="First, make sure you allow this app to access your location. Then, either take a photo of yourself (and whoever you're with!) or browse your local files for one. Once you upload it, give the app a few seconds, and your restaurant recommendation will be shown!" />
          <div className="button-wrapper-2">
            <label htmlFor="userphoto">
              <Button isImage="true" buttonText="Upload Photo" />
            </label>
            <input
              id="userphoto"
              type="file"
              accept="image/*"
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InputPage;
