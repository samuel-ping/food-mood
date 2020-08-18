import React, { Component } from "react";
import Loader from "react-spinners/ClipLoader";
import "../LandingPage/LandingPage.css";

class SubmitButton extends Component {
  sendBackPhoto = (e) => {
    this.props.handleImageSubmission(e.target.files[0]);
  };

  render() {
    if (!this.props.isLoading) {
      if (!this.props.isEnabled) {
        return (
          <>
            <label
              className={
                this.props.isMobile
                  ? "submit-button-mobile disabled"
                  : "submit-button disabled"
              }
            >
              Submit
            </label>
          </>
        );
      } else if (this.props.isEnabled) {
        return (
          <>
            <label
              className={
                this.props.isMobile
                  ? "submit-button-mobile active"
                  : "submit-button active"
              }
              htmlFor="photo-upload"
            >
              Submit
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={this.sendBackPhoto}
            />
          </>
        );
      }
    } else {
      return (
        <>
          <label className="loading-button">
            <Loader size={this.props.isMobile ? 60 : 30} color={"#ffffff"} />
          </label>
        </>
      );
    }
  }
}

export default SubmitButton;
