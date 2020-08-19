import React, { Component } from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
import Logo from "components/layout/Logo";
import Footer from "components/layout/Footer";

import "leaflet/dist/leaflet.css";
import "pages/ResultsPage.css";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

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
            <div id="leaflet-map">
              <LeafletMap
                center={userLocation}
                zoom={12}
                style={{ height: "70vh", width: "90vw" }}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {restaurantMarkers}
              </LeafletMap>
            </div>
          </div>
          <Footer isMobile={this.props.isMobile} />
        </div>
      </>
    );
  }
}

export default ResultsPage2;
