import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import InputPage from "./components/InputPage/InputPage";
import ResultsPage from "./components/ResultsPage/ResultsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/input-photo">
          <InputPage />
        </Route>
        <Route path="/results">
          <ResultsPage />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
