import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { StyleRoot } from "radium";

import Index from "./Index.jsx";
import KasegiPage from "./KasegiPage.jsx";

// TODO update mui version and remove this
injectTapEventPlugin();

export class App extends React.Component {
  render() {
    return (
      <StyleRoot>
        <MuiThemeProvider>
          <Switch>
            <Route exact path="/:locale" component={Index} />
            <Route
              exact
              path="/:locale/:ver/kasegi/:type/:scope"
              component={KasegiPage}
            />
          </Switch>
        </MuiThemeProvider>
      </StyleRoot>
    );
  }
}
