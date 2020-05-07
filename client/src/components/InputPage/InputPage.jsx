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
      encodedImage: null,
      longitude: null,
      latitude: null,
      mood: undefined,
      restaurantName: undefined,
    };
  }

  // When page loads, gets the geolocation of user
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var longitude = parseFloat(position.coords.longitude).toString();
        var latitude = parseFloat(position.coords.latitude).toString();
        this.setState({
          longitude: longitude,
          latitude: latitude,
        });
      });
    } else {
      alert(
        "You need to enable location sharing in order to get a restaurant!"
      );
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.mood !== prevState.mood) {
      console.log("mood is now", this.state.mood);
    }
  }

  // Method that converts input to base64.
  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error in converting file to base64: ", error);
    };
  }

  // Triggers when an image is uploaded. Encodes input image to base64.
  onChangeHandler = (event) => {
    console.log("change handler triggered");

    var uploadedFile = event.target.files[0];
    this.setState({
      selectedFile: uploadedFile,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("click handler triggered");

    var uploadedFile = this.state.selectedFile;

    this.getBase64(uploadedFile, (result) => {
      this.setState({
        encodedImage: result,
      });

      // Preparing data to be sent to backend.
      const data = {
        longitude: this.state.longitude,
        latitude: this.state.latitude,
        encodedImage: this.state.encodedImage,
      };

      // Sending data to backend to be processed.
      axios
        .post("http://localhost:5000/api/upload", data)
        .then((response) => {
          const returnData = JSON.stringify(response);
          const returnJSON = JSON.parse(returnData);
          this.setState({
            mood: returnJSON.data.mood,
            restaurantName: returnJSON.data.restaurantName,
          });
          console.log(this.state.mood);
          console.log(this.state.restaurantName);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  render() {
    return (
      <div className="input-page-wrapper">
        <Navbar />
        <div className="description-wrapper-2">
          <Description descriptionText="First, allow this app to use your location. Then, either take a photo of yourself (and whoever you're with!) or browse your local files for such a photo. Once you upload it, give the app a few seconds, and your restaurant recommendation will be shown!" />

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

            <form onClick={this.handleSubmit}>
              <label htmlFor="photo-upload">
                <Button buttonText="Get a restaurant suggestion!" />
              </label>
              <input id="photo-upload" type="button" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default InputPage;
