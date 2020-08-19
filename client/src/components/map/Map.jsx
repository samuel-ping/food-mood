import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

import "components/map/Map.css";

import "leaflet/dist/leaflet.css";
import "pages/ResultsPage.css";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = (props) => {
  return (
    <>
      <div id="leaflet-map">
        <LeafletMap
          center={props.center}
          zoom={12}
          style={{ height: "70vh", width: "90vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {props.markerList}
        </LeafletMap>
      </div>
    </>
  );
};

export default Map;
