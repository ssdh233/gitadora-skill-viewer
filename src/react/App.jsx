import React from "react";
import { Switch, Route } from "react-router-dom";
import Radium, { StyleRoot } from "radium";

import Index from "./Index.jsx";
import KasegiPageContainer, {
  loadData as loadDataForKasegiPageContainer
} from "./KasegiPageContainer.jsx";

export const routes = [
  {
    path: "/:locale",
    component: Index
  },
  {
    path: "/:locale/:ver/kasegi/:type/:scope",
    component: KasegiPageContainer,
    loadData: loadDataForKasegiPageContainer
  }
].map(route => ({
  ...route,
  exact: true
}));

class App extends React.Component {
  render() {
    return (
      <StyleRoot>
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </StyleRoot>
    );
  }
}

export default Radium(App);
