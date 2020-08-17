import React, { Component } from "react";

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
    return (
      <>
        <div className="location-share-button-wrapper">
          <button onClick={this.requestLocation}>
            Click here to enable location access for this app.
          </button>
        </div>
      </>
    );
  }
}

export default LocationRequestButton;
