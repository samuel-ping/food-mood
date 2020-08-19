import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { isMobile } from "react-device-detect";
import LandingPage from "pages/LandingPage";
import ResultsPage from "pages/ResultsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: { isShared: false, longitude: "", latitude: "" },
      resultsData: "",
      // Test Data
      // locationData: {
      //   isShared: true,
      //   longitude: "-74.67658",
      //   latitude: "40.304882",
      // },
      // resultsData: {
      //   mood: "HAPPY",
      //   restaurants: [
      //     {
      //       name: "Hoagie Haven",
      //       id: "5G0Vy0N4H6c4eIGxb1JPSQ",
      //       url:
      //         "https://www.yelp.com/biz/hoagie-haven-princeton?adjust_creative=2FKEDRKon6BvedEjHRuF_g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2FKEDRKon6BvedEjHRuF_g",
      //       image_url:
      //         "https://s3-media2.fl.yelpcdn.com/bphoto/PRAp4veC1qnxduAN8l_tVg/o.jpg",
      //       coordinates: { latitude: 40.35231, longitude: -74.65191 },
      //       address: { street: "242 Nassau St", city: "Princeton, NJ08542" },
      //     },
      //     {
      //       name: "Route 1 Diner Restaurant",
      //       id: "6Jl9fF4Et5fBQZK5WKNMBg",
      //       url:
      //         "https://www.yelp.com/biz/route-1-diner-restaurant-lawrence-township-2?adjust_creative=2FKEDRKon6BvedEjHRuF_g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2FKEDRKon6BvedEjHRuF_g",
      //       image_url:
      //         "https://s3-media1.fl.yelpcdn.com/bphoto/jrw8lKqK5KCo03ukmoMWVA/o.jpg",
      //       coordinates: { latitude: 40.25136, longitude: -74.7354 },
      //       address: {
      //         street: "2009 US Highway 1",
      //         city: "Lawrence Township, NJ08648",
      //       },
      //     },
      //     {
      //       name: "The Peacock Inn, an Ascend Hotel Collection Member",
      //       id: "k1bqQ1WRTi8h00vr2VvfYg",
      //       url:
      //         "https://www.yelp.com/biz/the-peacock-inn-an-ascend-hotel-collection-member-princeton-8?adjust_creative=2FKEDRKon6BvedEjHRuF_g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2FKEDRKon6BvedEjHRuF_g",
      //       image_url:
      //         "https://s3-media1.fl.yelpcdn.com/bphoto/gOr3z0mip281BJy74Rr8Dg/o.jpg",
      //       coordinates: { latitude: 40.349139, longitude: -74.665491 },
      //       address: { street: "20 Bayard Lane", city: "Princeton, NJ08540" },
      //     },
      //     {
      //       name: "Triumph Brewing Company",
      //       id: "8sGKlCVtewMuA2RGyfatyg",
      //       url:
      //         "https://www.yelp.com/biz/triumph-brewing-company-princeton?adjust_creative=2FKEDRKon6BvedEjHRuF_g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2FKEDRKon6BvedEjHRuF_g",
      //       image_url:
      //         "https://s3-media2.fl.yelpcdn.com/bphoto/mLKSkFV8fS7Nvs9eYFi8WQ/o.jpg",
      //       coordinates: { latitude: 40.35038, longitude: -74.65817 },
      //       address: { street: "138 Nassau St", city: "Princeton, NJ08542" },
      //     },
      //     {
      //       name: "Alchemist & Barrister",
      //       id: "xDosQDBA7H82xv6__mgjdA",
      //       url:
      //         "https://www.yelp.com/biz/alchemist-and-barrister-princeton?adjust_creative=2FKEDRKon6BvedEjHRuF_g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2FKEDRKon6BvedEjHRuF_g",
      //       image_url:
      //         "https://s3-media1.fl.yelpcdn.com/bphoto/YayqXpXM3geg4ywnfg3zwA/o.jpg",
      //       coordinates: {
      //         latitude: 40.3503760435435,
      //         longitude: -74.660232124928,
      //       },
      //       address: {
      //         street: "28 Witherspoon St",
      //         city: "Princeton, NJ08540",
      //       },
      //     },
      //     {
      //       name: "Winberie's Restaurant & Bar",
      //       id: "HIPGr2gSEN4T73tjz47hpw",
      //       url:
      //         "https://www.yelp.com/biz/winberies-restaurant-and-bar-princeton?adjust_creative=2FKEDRKon6BvedEjHRuF_g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2FKEDRKon6BvedEjHRuF_g",
      //       image_url:
      //         "https://s3-media3.fl.yelpcdn.com/bphoto/m4tLweBg6Q7mXHBZ4yNcaw/o.jpg",
      //       coordinates: { latitude: 40.349832, longitude: -74.660858 },
      //       address: { street: "1 Palmer Sq E", city: "Princeton, NJ08542" },
      //     },
      //     {
      //       name: "Wawa",
      //       id: "3-RmEE98GY1357BciBml3w",
      //       url:
      //         "https://www.yelp.com/biz/wawa-hamilton-2?adjust_creative=2FKEDRKon6BvedEjHRuF_g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2FKEDRKon6BvedEjHRuF_g",
      //       image_url:
      //         "https://s3-media2.fl.yelpcdn.com/bphoto/dW-j8AKwJsRS_8tzNAeJ2g/o.jpg",
      //       coordinates: {
      //         latitude: 40.2281743260925,
      //         longitude: -74.6648954227567,
      //       },
      //       address: { street: "1200 State Hwy 33", city: "Hamilton, NJ08690" },
      //     },
      //     {
      //       name: "JoJo's Tavern",
      //       id: "HuuUUhHHwARFdd6LtWrZgg",
      //       url:
      //         "https://www.yelp.com/biz/jojos-tavern-trenton?adjust_creative=2FKEDRKon6BvedEjHRuF_g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2FKEDRKon6BvedEjHRuF_g",
      //       image_url:
      //         "https://s3-media2.fl.yelpcdn.com/bphoto/GWXNkXsmn35u8T-zksCjWg/o.jpg",
      //       coordinates: { latitude: 40.236134, longitude: -74.68877 },
      //       address: {
      //         street: "2677 Nottingham Way",
      //         city: "Trenton, NJ08619",
      //       },
      //     },
      //     {
      //       name: "Wendy's",
      //       id: "yT5slfg8C1WijE0FiUiebg",
      //       url:
      //         "https://www.yelp.com/biz/wendys-trenton-3?adjust_creative=2FKEDRKon6BvedEjHRuF_g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2FKEDRKon6BvedEjHRuF_g",
      //       image_url:
      //         "https://s3-media1.fl.yelpcdn.com/bphoto/gO2B7ih7n5XlcNBxg7qMuA/o.jpg",
      //       coordinates: {
      //         latitude: 40.2478523644738,
      //         longitude: -74.7677541976538,
      //       },
      //       address: { street: "1730 N. Olden Ave.", city: "Trenton, NJ08638" },
      //     },
      //     {
      //       name: "Ivy Inn",
      //       id: "0AG93DSyGOrpUsx6NV-zqA",
      //       url:
      //         "https://www.yelp.com/biz/ivy-inn-princeton?adjust_creative=2FKEDRKon6BvedEjHRuF_g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2FKEDRKon6BvedEjHRuF_g",
      //       image_url:
      //         "https://s3-media2.fl.yelpcdn.com/bphoto/Y73-Iq_DTfzFcrtYQ2-IhQ/o.jpg",
      //       coordinates: { latitude: 40.35237, longitude: -74.65152 },
      //       address: { street: "248 Nassau St", city: "Princeton, NJ08542" },
      //     },
      //   ],
      // },
      // END TEST DATA
    };
    this.setLocationData = this.setLocationData.bind(this);
    this.handleDataRetrieval = this.handleDataRetrieval.bind(this);
  }

  setLocationData = (locationData) => {
    this.setState({ locationData: locationData });
  };

  // When the data from backend is retrieved, it is sent to this component and this method sets the state to the data.
  handleDataRetrieval = (resultsData) => {
    this.setState({ resultsData: resultsData });
    history.push(`/results`);
  };

  render() {
    return (
      <>
        <Router history={history}>
          <Switch>
            <Route path="/results">
              <ResultsPage
                locationData={this.state.locationData}
                resultsData={this.state.resultsData}
              />
            </Route>
            <Route path="/">
              <LandingPage
                isMobile={isMobile}
                setLocationData={this.setLocationData}
                locationData={this.state.locationData}
                onDataRetrieval={this.handleDataRetrieval}
              />
            </Route>
          </Switch>
        </Router>
        <ToastContainer />
      </>
    );
  }
}

export default App;
