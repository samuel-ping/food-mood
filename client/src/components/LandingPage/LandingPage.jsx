import React, { Component } from "react";
import axios from "axios";
import Logo from "../Logo";
import LocationRequestButton from "../buttons/LocationRequestButton";
import SubmitButton from "../buttons/SubmitButton";
import PastaBackground from "../../assets/pasta-basil-landing-background.jpg";
import "./LandingPage.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationShared: false,
      longitude: "",
      latitude: "",
      loadingResults: false,
      encodedImage: "",
      resultsData: "",
      image: "",
    };
    this.retrieveLocation = this.retrieveLocation.bind(this);
    this.handleImageSubmission = this.handleImageSubmission.bind(this);
  }

  retrieveLocation = (location) => {
    this.setState({
      locationShared: true,
      longitude: location.longitude,
      latitude: location.latitude,
    });
  };

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
        <div
          className="landing-wrapper"
          style={{
            backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.471),
                rgba(0, 0, 0, 0.471)
              ), url("${PastaBackground}")`,
          }}
        >
          <Logo isNavbarLogo="true" />
          <div className="description-wrapper">
            <div className="description">
              This web application takes your mood from your photo, then
              suggests a restaurant based on that mood!
            </div>
            <div className="directions-wrapper">
              <ol>
                <li>
                  <LocationRequestButton
                    handleLocation={this.retrieveLocation}
                  />
                </li>
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
            <SubmitButton
              handleImageSubmission={this.handleImageSubmission}
              isEnabled={this.state.locationShared}
              isLoading={this.state.loadingResults}
            />
          </div>
        </div>
      </>
    );
  }
}

export default LandingPage;
