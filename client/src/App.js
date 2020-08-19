import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { isMobile } from "react-device-detect";
import LandingPage from "./components/LandingPage/LandingPage";
import ResultsPage from "./components/ResultsPage/ResultsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ResultsPage2 from "./components/ResultsPage/ResultsPage2";

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: { isShared: false, longitude: "", latitude: "" },
      resultsData: "",
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
    history.push(`/results-test`);
  };

  render() {
    return (
      <>
        <Router history={history}>
          <Switch>
            <Route path="/results">
              <ResultsPage resultsData={this.state.resultsData} />
            </Route>
            <Route path="/results-test">
              <ResultsPage2
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
