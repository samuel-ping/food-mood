import React, { Component } from "react";
import Background from "../../assets/skewer-background.png";
import Navbar from "../Navbar";
import Description from "../Description";
import BrowseImagesButton from "./BrowseImagesButton";
import SubmitImageButton from "./SubmitImageButton";
import "./InputPage.css";

const pageBackground = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

class InputPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageUploaded: false,
      longitude: null,
      latitude: null,
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleFileChange(image, testtext) {
    this.setState({ image: image, imageUploaded: true });
  }

  handleSubmit(resultsData) {
    this.props.onDataRetrieval(resultsData);
  }

  render() {
    return (
      <div className="input-page-wrapper" style={pageBackground}>
        <Navbar />
        <div className="description-wrapper-2">
          <Description descriptionText="First, allow this app to use your location. Then, either take a photo of yourself (and whoever you're with!) or browse your local files for such a photo. Once you upload it, give the app a few seconds, and your restaurant recommendation will be shown!" />

          <div className="button-wrapper-2">
            <div id="browse-images-button-wrapper">
              <BrowseImagesButton
                onFileChange={this.handleFileChange}
                isActivated="true"
              />
            </div>
            {this.state.imageUploaded ? (
              <SubmitImageButton
                image={this.state.image}
                longitude={this.state.longitude}
                latitude={this.state.latitude}
                onSubmit={this.handleSubmit}
                isActivated="true"
              />
            ) : (
              <SubmitImageButton isActivated="false" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default InputPage;
