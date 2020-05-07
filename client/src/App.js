import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import InputPage from "./components/InputPage/InputPage";
import ResultsPage from "./components/ResultsPage/ResultsPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsData: null,
    };
    this.handleDataRetrieval = this.handleDataRetrieval.bind(this);
  }

  handleDataRetrieval(resultsData) {
    console.log("received data from child component");
    this.setState({ resultsData: resultsData });
    console.log(this.state.resultsData);
  }

  render() {
    return (
      <Router>
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
    );
  }
}

export default App;
