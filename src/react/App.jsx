import React from "react";
import { Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StyleRoot } from "radium";

import Index from "./Index.jsx";
import KasegiPageContainer from "./KasegiPageContainer.jsx";
import reducer from "./reducer";

const store = createStore(reducer);

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StyleRoot>
          <Switch>
            <Route exact path="/:locale" component={Index} />
            <Route
              exact
              path="/:locale/:ver/kasegi/:type/:scope"
              component={KasegiPageContainer}
            />
          </Switch>
        </StyleRoot>
      </Provider>
    );
  }
}
