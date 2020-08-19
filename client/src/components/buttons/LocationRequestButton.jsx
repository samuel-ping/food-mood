import React, { Component } from "react";

import "components/buttons/Buttons.css";

class LocationRequestButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: { isShared: false, longitude: "", latitude: "" },
    };
  }

  requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var longitude = parseFloat(position.coords.longitude).toString();
        var latitude = parseFloat(position.coords.latitude).toString();
        this.setState({
          locationData: {
            isShared: true,
            longitude: longitude,
            latitude: latitude,
          },
        });

        this.props.handleLocation(this.state.locationData);
      });
    } else {
      alert(
        "You need to enable location sharing in order to get a restaurant!"
      );
    }
  };

  render() {
    if (!this.props.isDisabled) {
      return (
        <>
          <button
            className={
              this.props.isMobile
                ? "location-share-button-mobile"
                : "location-share-button"
            }
            onClick={this.requestLocation}
          >
            {this.props.isMobile ? "1." : ""} Click here to enable location
            access for this app.
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            className={
              this.props.isMobile
                ? "location-share-button-mobile"
                : "location-share-button"
            }
            disabled
          >
            Click here to enable location access for this app.
          </button>
        </>
      );
    }
  }
}

export default LocationRequestButton;
