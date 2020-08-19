import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import Logo from "components/layout/Logo";
import Map from "components/map/Map";
import Footer from "components/layout/Footer";

class ResultsPage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const userLocation = [
      this.props.locationData.latitude,
      this.props.locationData.longitude,
    ];

    const restaurantMarkers = this.props.resultsData.restaurants.map(
      (aRestaurant) => (
        <Marker
          key={aRestaurant.id}
          position={[
            aRestaurant.coordinates.latitude,
            aRestaurant.coordinates.longitude,
          ]}
        >
          <Popup>{aRestaurant.name}</Popup>
        </Marker>
      )
    );

    return (
      <>
        <div className="results-page-wrapper">
          <Logo />
          <div className="results-section">
            <div className="results-mood-wrapper">
              You appear to be{" "}
              <span className="bold">
                {this.props.resultsData.mood.toLowerCase()}
              </span>
              {/* If mood is happy or surprised, end with exclamation point. Or else, end with a period. */}
              {this.props.resultsData.mood.localeCompare("HAPPY") === 0 ||
              this.props.resultsData.mood.localeCompare("SURPRISED") === 0
                ? "!"
                : "."}
            </div>
            <div className="results-top-choice-wrapper">
              Your top restaurant suggestion is{" "}
              {this.props.resultsData.restaurants[0].name}.
            </div>
            <Map center={userLocation} markerList={restaurantMarkers} />
          </div>
          <Footer isMobile={this.props.isMobile} />
        </div>
      </>
    );
  }
}

export default ResultsPage2;
