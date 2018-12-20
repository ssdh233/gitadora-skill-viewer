import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Radium, { StyleRoot } from "radium";
import Index from "./Index.jsx";
import AppHeader from "./AppHeader.jsx";
import KasegiPageContainer, {
  loadData as loadDataForKasegiPageContainer
} from "./KasegiPageContainer.jsx";
import ListPageContainer, {
  loadData as loadDataForListPageContainer
} from "./ListPageContainer.jsx";
import { setIsSSR } from "./actions";

/* eslint-disable react/display-name */
export const routes = [
  {
    path: "/:locale",
    render: props => <Index {...props} />
  },
  {
    path: "/:locale/:ver/kasegi/:type/:scope",
    render: props => <KasegiPageContainer {...props} />,
    loadData: loadDataForKasegiPageContainer
  },
  {
    path: "/:locale/:ver/list",
    render: props => <ListPageContainer {...props} />,
    loadData: loadDataForListPageContainer
  },
  {
    path: "/:locale/:ver/userlist",
    render: props => <ListPageContainer isAdmin={true} {...props} />,
    loadData: loadDataForListPageContainer
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
        <div style={styles.globalStyle}>
          <Route path="/:locale" component={AppHeader} />
          <Switch>
            {routes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        </div>
      </StyleRoot>
    );
  }
}

const styles = {
  globalStyle: {
    fontFamily: "verdana",
    fontSize: 16,

    "@media (max-width: 742px)": {
      fontSize: 14
    }
  }
};

export default Radium(withRouter(connect()(App)));
