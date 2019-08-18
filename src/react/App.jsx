import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Radium, { StyleRoot } from "radium";

import Index from "./Index.jsx";
import AppHeader from "./AppHeader.jsx";
import UserVoicePage from "./UserVoicePage.jsx";
import KasegiPage from "./KasegiPage";
import ListPage from "./ListPage";
import SkillPageContainer, { SavedSkillPageContainer } from "./SkillPage";

function MyRoute({ path, component, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      path={path}
      render={props => {
        return (
          <>
            <AppHeader {...props} />
            {React.createElement(component, props)}
          </>
        );
      }}
    />
  );
}

class App extends React.Component {
  componentDidMount() {
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
            <MyRoute exact path="/:locale" component={Index} />
            <MyRoute
              exact
              path="/:locale/uservoice"
              component={UserVoicePage}
            />
            <MyRoute
              exact
              path="/:locale/:version/kasegi/:type/:scope"
              component={KasegiPage}
            />
            <MyRoute exact path="/:locale/:version/list" component={ListPage} />
            <MyRoute
              exact
              path="/:locale/:version/userlist"
              component={props => <ListPage {...props} isAdmin />}
            />
            <MyRoute
              exact
              path="/:locale/:version/:id/p"
              component={SavedSkillPageContainer}
            />
            <MyRoute
              exact
              path="/:locale/:version/:id/:type"
              component={SkillPageContainer}
            />
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

export default Radium(withRouter(App));
