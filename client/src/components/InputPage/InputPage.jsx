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
      selectedFile: null,
      base64encode: 0,
    };
  }

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  onChangeHandler = (event) => {
    var uploadedFile = event.target.files[0];
    this.getBase64(uploadedFile, (result) => {
      this.setState({
        selectedFile: uploadedFile,
        base64encode: result,
      });
    });
  };

  handleSubmit = (event) => {
    console.log("click handler triggered");
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    console.log("state.selectedFile:", this.state.selectedFile);
    axios.post("api/uploadfile", data);
  };

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
            <input
              id="userphoto"
              type="file"
              accept="image/*"
              onChange={this.onChangeHandler}
            />

            <form onSubmit={this.handleSubmit}>
              <label htmlFor="photo-upload">
                <Button buttonText="Get a restaurant!" />
              </label>
              <input id="photo-upload" type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default InputPage;
