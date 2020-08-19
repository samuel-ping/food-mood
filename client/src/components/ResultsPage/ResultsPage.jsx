import React, { Component } from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
import Logo from "../Logo";
import Footer from "../Footer";
import "leaflet/dist/leaflet.css";
import "./ResultsPage.css";

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
    console.log(this.props.resultsData);
    const restaurantMarkers = this.props.resultsData.restaurants.map(
      (aRestaurant) => (
        <Marker
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
              You appear to be {this.props.resultsData.mood.toLowerCase()}
            </div>
            <div id="leaflet-map">
              <LeafletMap
                center={userLocation}
                zoom={8}
                style={{ height: "70vh", width: "800px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {restaurantMarkers}
              </LeafletMap>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default ResultsPage2;
