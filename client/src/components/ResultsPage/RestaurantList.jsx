import React, { Component } from "react";
import AddressList from "./AddressList";
import "./RestaurantList.css";

class RestaurantList extends Component {
  render() {
    return (
      <div id="restaurant-list-wrapper">
        <div id="list-title">Your restaurant suggestion is:</div>
        <div id="restaurant-suggestion">
          {this.props.restaurantName}
          <div id="restaurant-address">
            <AddressList
              bullets={this.props.restaurantLocation.display_address}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantList;
