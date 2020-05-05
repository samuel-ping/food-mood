import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import InputPage from "./components/InputPage/InputPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/input-photo">
          <InputPage />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
