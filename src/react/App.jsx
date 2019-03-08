import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Radium, { StyleRoot } from "radium";
import loadable from "loadable-components";

// const Index = loadable(() => import("./Index.jsx"));
// const AppHeader = loadable(() => import("./AppHeader.jsx"));
// const UserVoicePage = loadable(() => import("./UserVoicePage.jsx"));
// const KasegiPageContainer = loadable(() => import("./KasegiPageContainer.jsx"));
// const ListPageContainer = loadable(() => import("./ListPageContainer.jsx"));
// const SkillPageContainer = loadable(() => import("./SkillPageContainer.jsx"));
// const SavedSkillPageContainer = loadable(() =>
//   import("./SavedSkillPageContainer.jsx")
// );

import TestPage from "./TestPage.jsx";
import Index from "./Index.jsx";
import AppHeader from "./AppHeader.jsx";
import UserVoicePage from "./UserVoicePage.jsx";
import KasegiPageContainer from "./KasegiPageContainer.jsx";
import ListPageContainer from "./ListPageContainer.jsx";
import SkillPageContainer from "./SkillPageContainer.jsx";
import SavedSkillPageContainer from "./SavedSkillPageContainer.jsx";
import { setIsSSR } from "./actions";

/* eslint-disable react/display-name */

function MyRoute(props) {
  const outerProps = props;
  return (
    <Route
      render={innerProps => {
        const props = {
          ...innerProps,
          match: outerProps.computedMatch
        };

        return (
          <>
            <AppHeader {...props} />
            {React.createElement(outerProps.component, props)}
          </>
        );
      }}
    />
  );
}

export const routes = [
  {
    path: "/:locale",
    component: Index
  },
  {
    path: "/:locale/test",
    component: TestPage
  },
  {
    path: "/:locale/uservoice",
    component: UserVoicePage
  },
  {
    path: "/:locale/:ver/kasegi/:type/:scope",
    component: KasegiPageContainer
  },
  {
    path: "/:locale/:ver/list",
    component: ListPageContainer
  },
  {
    path: "/:locale/:ver/userlist",
    component: ListPageContainer
    // TODO add isAdmin=true
  },
  {
    path: "/:locale/:ver/:id/p",
    component: SavedSkillPageContainer
  },
  {
    path: "/:locale/:ver/:id/:type",
    component: SkillPageContainer
  }
].map(route => ({
  ...route,
  exact: true
}));

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(setIsSSR(false));

    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <StyleRoot>
        <div style={styles.globalStyle}>
          <Switch>
            {routes.map(route => (
              <MyRoute key={route.path} {...route} />
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
    maxWidth: 1200,
    margin: "auto",

    "@media (max-width: 742px)": {
      fontSize: 14
    }
  }
};

export default Radium(withRouter(connect()(App)));
