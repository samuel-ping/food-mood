import React, { Component } from "react";
import axios from "axios";
import Logo from "../Logo";
import Button from "../Button";
import "./LandingPage.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: "",
      latitude: "",
      loadingResults: false,
      encodedImage: "",
      resultsData: "",
      image: "",
    };
    this.handleImageSubmission = this.handleImageSubmission.bind(this);
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

  handleImageSubmission = (imageSubmission) => {
    this.setState({ loadingResults: true });

    const image = imageSubmission;

    this.getBase64(image, (result) => {
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
        .post("/api/upload", data)
        .then((response) => {
          // Formats returned data and send it back to parent
          const returnJSON = JSON.parse(JSON.stringify(response));
          const status = returnJSON.data.status;

          const returnToParentData = {
            mood: returnJSON.data.mood,
            restaurantName: returnJSON.data.restaurantName,
            restaurantLocation: returnJSON.data.restaurantLocation,
          };

          this.setState({
            resultsData: returnToParentData,
          });

          this.props.onDataRetrieval(returnToParentData);
        })
        .catch((error) => {
          var alertMessage = error.response.statusText;
          console.log(alertMessage);
        });
    });
  };

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

  render() {
    return (
      <>
        <div className="landing-wrapper">
          <Logo isNavbarLogo="true" />
          <div className="description-wrapper">
            <div className="description">
              This web application takes your mood from your photo, then
              suggests a restaurant based on that mood!
            </div>
            <div className="directions-wrapper">
              <ol>
                <li>Enable location sharing.</li>
                <li>
                  Press the submit button below to either take a photo of
                  yourself (and whoever you're with!) or choose a selfie from
                  your gallery.
                </li>
                <li>
                  After choosing a photo, wait a few seconds, and Food Mood will
                  recommend a nearby restaurant for you!
                </li>
              </ol>
            </div>
          </div>
          <div className="button-wrapper">
            <Button
              handleImageSubmission={this.handleImageSubmission}
              isLoading={this.state.loadingResults}
            />
          </div>
        </div>
      </>
    );
  }
}

export default LandingPage;
