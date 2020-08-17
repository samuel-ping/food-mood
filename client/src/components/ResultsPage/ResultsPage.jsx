import React, { Component } from "react";
import Background from "../Background/Background";
import Navbar from "../Navbar";
import RestaurantList from "./RestaurantList";
import Map from "./Map";
import MoodBar from "./MoodBar";
import "./ResultsPage.css";

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Example Data:
      // resultsData: {
      //   mood: "HAPPY",
      //   restaurantName: "A Happy Family",
      //   restaurantLocation: {
      //     display_address: {
      //       street: "1342 Brunswick Pike",
      //       city: "Trenton, NJ 08638",
      //     },
      //   },
      // },
    };
  }

  render() {
    return (
      <div id="results-page-wrapper">
        <div id="results-page-background">
          <Background
            backgroundImage="beefBowlImage"
            placeholderImage="tinyBeefBowlImage"
          />
        </div>
        <Navbar />
        <div id="results-middle-page">
          <MoodBar mood={this.props.resultsData.mood} />
          <RestaurantList
            restaurantName={this.props.resultsData.restaurantName}
            restaurantLocation={this.props.resultsData.restaurantLocation}
          />
          {/* <Map /> */}
        </div>
      </div>
    );
  }
}

export default ResultsPage;
