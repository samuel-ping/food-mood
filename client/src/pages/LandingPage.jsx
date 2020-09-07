import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "components/layout/Logo";
import LocationRequestButton from "components/buttons/LocationRequestButton";
import SubmitButton from "components/buttons/SubmitButton";
import Footer from "components/layout/Footer";
import PastaBackground from "assets/pasta-basil-landing-background.jpg";

import "pages/LandingPage.css";

const toastConfig = {
  position: "bottom-center",
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingResults: false,
      encodedImage: "",
      resultsData: "",
      image: "",
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.handleImageSubmission = this.handleImageSubmission.bind(this);
  }

  handleLocation = (locationData) => {
    this.props.setLocationData(locationData);
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
        longitude: this.props.locationData.longitude,
        latitude: this.props.locationData.latitude,
        encodedImage: this.state.encodedImage,
      };

      let config = {
        headers: {
          "x-api-key": "PBKi2R6ArV9onFw81Qt7f6ThfCn5Z8yk5xkWzHTA", // only made the API key to learn about it, there shouldn't be any security issues by putting this here
        },
      };

      // Sending data to backend to be processed.
      axios
        .post(
          "https://8866da91a7.execute-api.us-east-1.amazonaws.com/production/foodmood-backend",
          data,
          config
        )
        .then((response) => {
          // Formats returned data and send it back to parent
          const returnJSON = JSON.parse(JSON.stringify(response));
          this.props.onDataRetrieval(returnJSON.data);
        })
        .catch((error) => {
          toast.error(error.message, toastConfig);
          this.setState({ loadingResults: false });
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
      const theError = ("Error in converting file to base64: ", error);
      toast.error(theError, toastConfig);
    };
  }

  render() {
    if (this.props.isMobile) {
      return (
        <>
          <div
            className="landing-wrapper-mobile"
            style={{
              backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.529),
              rgba(0, 0, 0, 0.529)
            ), url("${PastaBackground}")`,
            }}
          >
            <Logo isMobile={this.props.isMobile} />
            <div className="description-wrapper-mobile">
              <div className="description-mobile">
                This web application takes your mood from your photo, then
                suggests a restaurant based on that mood!
              </div>
              <div className="directions-wrapper-mobile">
                <ul>
                  <li>
                    <LocationRequestButton
                      isMobile={this.props.isMobile}
                      handleLocation={this.handleLocation}
                      isDisabled={this.props.locationData.isShared}
                    />
                  </li>
                  <li>
                    2. Press the submit button below to either take a photo of
                    yourself (and whoever you're with!) or choose a selfie from
                    your gallery.
                  </li>
                  <li>
                    3. After choosing a photo, wait a few seconds, and Food Mood
                    will recommend a nearby restaurant for you!
                  </li>
                </ul>
              </div>
            </div>
            <div className="button-wrapper-mobile">
              <SubmitButton
                isMobile={this.props.isMobile}
                handleImageSubmission={this.handleImageSubmission}
                isEnabled={this.props.locationData.isShared}
                isLoading={this.state.loadingResults}
              />
            </div>
            <Footer isMobile={this.props.isMobile} />
          </div>
        </>
      );
    } else {
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
            <Logo />
            <div className="description-wrapper">
              <div className="description">
                This web application takes your mood from your photo, then
                suggests a restaurant based on that mood!
              </div>
              <div className="directions-wrapper">
                <ol>
                  <li>
                    <LocationRequestButton
                      handleLocation={this.handleLocation}
                      isDisabled={this.props.locationData.isShared} // if location is shared, disable this button
                    />
                  </li>
                  <li>
                    Press the submit button below to either take a photo of
                    yourself (and whoever you're with!) or choose a selfie from
                    your gallery.
                  </li>
                  <li>
                    After choosing a photo, wait a few seconds, and Food Mood
                    will recommend a nearby restaurant for you!
                  </li>
                </ol>
              </div>
            </div>
            <div className="button-wrapper">
              <SubmitButton
                handleImageSubmission={this.handleImageSubmission}
                isEnabled={this.props.locationData.isShared} // if location is shared, enable this button
                isLoading={this.state.loadingResults}
              />
            </div>
            <Footer />
          </div>
        </>
      );
    }
  }
}

export default LandingPage;
