import React, { Component } from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
import Logo from "../Logo";
import Footer from "../Footer";
import "leaflet/dist/leaflet.css";
import "./ResultsPage2.css";

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
    this.state = {
      businesses: [
        {
          rating: 4,
          price: "$",
          phone: "+14152520800",
          id: "E8RJkjfdcwgtyoPMjQ_Olg",
          alias: "four-barrel-coffee-san-francisco",
          is_closed: false,
          categories: [
            {
              alias: "coffee",
              title: "Coffee & Tea",
            },
          ],
          review_count: 1738,
          name: "Four Barrel Coffee",
          url: "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
          coordinates: {
            latitude: 37.7670169511878,
            longitude: -122.42184275,
          },
          image_url:
            "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
          location: {
            city: "San Francisco",
            country: "US",
            address2: "",
            address3: "",
            state: "CA",
            address1: "375 Valencia St",
            zip_code: "94103",
          },
          distance: 1604.23,
          transactions: ["pickup", "delivery"],
        },
      ],
    };
  }

  render() {
    const userLocation = [
      this.props.locationData.latitude,
      this.props.locationData.longitude,
    ];

    const restaurantMarkers = this.state.businesses.map((aBusiness) => (
      <Marker
        position={[
          aBusiness.coordinates.latitude,
          aBusiness.coordinates.longitude,
        ]}
      >
        <Popup>{aBusiness.name}</Popup>
      </Marker>
    ));

    return (
      <>
        <div className="results-page-wrapper">
          <Logo />
          <div className="results-section">
            <div className="results-mood-wrapper">You appear to be:</div>
            <div id="leaflet-map">
              <LeafletMap
                center={userLocation}
                zoom={0}
                style={{ height: "400px", width: "800px" }}
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
