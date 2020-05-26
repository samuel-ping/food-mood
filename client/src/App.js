import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import LandingPage from "./components/LandingPage/LandingPage";
import InputPage from "./components/InputPage/InputPage";
import ResultsPage from "./components/ResultsPage/ResultsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    history.push(`/results`);
  }

  render() {
    return (
      <>
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
        <ToastContainer />
      </>
    );
  }
}

export default App;
