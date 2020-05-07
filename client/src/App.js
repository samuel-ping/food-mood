import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import LandingPage from "./components/LandingPage/LandingPage";
import InputPage from "./components/InputPage/InputPage";
import ResultsPage from "./components/ResultsPage/ResultsPage";

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsData: null,
    };
    this.handleDataRetrieval = this.handleDataRetrieval.bind(this);
  }
  // When the data from backend is retrieved, it is sent to this component and this method sets the state to the data.
  // resultsData: {
  //   mood:
  //   restaurantName:
  // }
  handleDataRetrieval(resultsData) {
    this.setState({ resultsData: resultsData });
    console.log("RESULTSDATA@APP.js:", this.state.resultsData);
    history.push(`/results`);
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/input-photo">
              <InputPage onDataRetrieval={this.handleDataRetrieval} />
            </Route>
            <Route path="/results">
              <ResultsPage resultsData={this.state.resultsData} />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
