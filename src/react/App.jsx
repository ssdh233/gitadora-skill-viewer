import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Radium, { StyleRoot } from "radium";

import Index from "./Index.jsx";
import AppHeader from "./AppHeader.jsx";
import UserVoicePage from "./UserVoicePage.jsx";
import KasegiPageContainer, {
  loadData as loadDataForKasegiPageContainer
} from "./KasegiPageContainer.jsx";
import ListPageContainer, {
  loadData as loadDataForListPageContainer
} from "./ListPageContainer.jsx";
import SkillPageContainer, {
  loadData as loadDataForSkillPageContainer
} from "./SkillPageContainer.jsx";
import { setIsSSR } from "./actions";

/* eslint-disable react/display-name */

export const routes = [
  {
    path: "/:locale",
    render: props => (
      <>
        <AppHeader {...props} />
        <Index {...props} />
      </>
    )
  },
  {
    path: "/:locale/uservoice",
    render: props => (
      <>
        <AppHeader {...props} />
        <UserVoicePage {...props} />
      </>
    )
  },
  {
    path: "/:locale/:ver/kasegi/:type/:scope",
    render: props => (
      <>
        <AppHeader {...props} />
        <KasegiPageContainer {...props} />
      </>
    ),
    loadData: loadDataForKasegiPageContainer
  },
  {
    path: "/:locale/:ver/list",
    render: props => (
      <>
        <AppHeader {...props} />
        <ListPageContainer {...props} />
      </>
    ),
    loadData: loadDataForListPageContainer
  },
  {
    path: "/:locale/:ver/userlist",
    render: props => (
      <>
        <AppHeader {...props} />
        <ListPageContainer isAdmin={true} {...props} />
      </>
    ),
    loadData: loadDataForListPageContainer
  },
  {
    path: "/:locale/:ver/:id/:type",
    render: props => (
      <>
        <AppHeader {...props} />
        <SkillPageContainer {...props} />
      </>
    ),
    loadData: loadDataForSkillPageContainer
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
    maxWidth: 1200,
    margin: "auto",

    "@media (max-width: 742px)": {
      fontSize: 14
    }
  }
};

export default Radium(withRouter(connect()(App)));
