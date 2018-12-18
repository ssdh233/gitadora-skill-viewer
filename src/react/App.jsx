import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Radium, { StyleRoot } from "radium";
import Index from "./Index.jsx";
import AppHeader from "./AppHeader.jsx";
import KasegiPageContainer, {
  loadData as loadDataForKasegiPageContainer
} from "./KasegiPageContainer.jsx";
import { setIsSSR } from "./actions";

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
  componentDidMount() {
    this.props.dispatch(setIsSSR(false));
  }

  render() {
    return (
      <StyleRoot>
        <Route path="/:locale" component={AppHeader} />
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </StyleRoot>
    );
  }
}

export default Radium(withRouter(connect()(App)));
