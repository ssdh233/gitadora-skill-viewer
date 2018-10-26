import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { StyleRoot } from "radium";

import Index from "./Index.jsx";

// TODO update mui version and remove this
injectTapEventPlugin();

export class App extends React.Component {
  render() {
    return (
      <StyleRoot>
        <MuiThemeProvider>
          <Switch>
            <Route exact path="/:locale" component={Index} />
          </Switch>
        </MuiThemeProvider>
      </StyleRoot>
    );
  }
}
