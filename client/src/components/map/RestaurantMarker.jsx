import React from "react";
import { Popup } from "react-leaflet";

import "components/map/RestaurantMarker.css";

const RestaurantMarker = (props) => {
  var categoriesString = "";
  for (var i = 0; i < props.categories.length; i++) {
    categoriesString = categoriesString.concat(props.categories[i].title);

    if (i < props.categories.length - 2)
      categoriesString = categoriesString.concat(", ");
    else if (i < props.categories.length - 1)
      categoriesString = categoriesString.concat(" & ");
  }
  return (
    <>
      <Popup minWidth="250" maxHeight="auto">
        <a
          className="restaurant-marker-wrapper"
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="restaurant-market-left">
            <img
              className="restaurant-marker-image"
              src={props.imageURL}
              alt="restaurant"
            />
          </div>
          <div className="restaurant-marker-right">
            <span className="restaurant-marker-name">
              {props.restaurantName}
            </span>
            <div>
              <span className="restaurant-marker-street">{props.street}, </span>
              <span className="restaurant-marker-city">{props.city}</span>
            </div>
            <span className="restaurant-marker-categories">
              {categoriesString}
            </span>
          </div>
        </a>
      </Popup>
    </>
  );
};

export default RestaurantMarker;
