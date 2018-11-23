import React from "react";
import { Switch, Route } from "react-router-dom";
import { StyleRoot } from "radium";

import Index from "./Index.jsx";
import KasegiPage from "./KasegiPage.jsx";

export class App extends React.Component {
  render() {
    return (
      <StyleRoot>
        <Switch>
          <Route exact path="/:locale" component={Index} />
          <Route
            exact
            path="/:locale/:ver/kasegi/:type/:scope"
            component={KasegiPage}
          />
        </Switch>
      </StyleRoot>
    );
  }
}
