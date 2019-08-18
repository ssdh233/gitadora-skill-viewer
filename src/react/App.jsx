import React from "react";
import styled from "styled-components";
import { Switch, Route, withRouter } from "react-router-dom";

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
      <AppDiv>
        <Switch>
          <MyRoute exact path="/:locale" component={Index} />
          <MyRoute exact path="/:locale/uservoice" component={UserVoicePage} />
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
      </AppDiv>
    );
  }
}

const AppDiv = styled.div`
  font-family: verdana;
  font-size: 16px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 742px) : {
    font-size: 14px;
  }
`;

export default withRouter(App);
