import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Route, Switch, withRouter } from "react-router-dom";

import IndexPage from "./IndexPage";
import AppHeader from "./AppHeader.jsx";
import UserVoicePage from "./UserVoicePage.jsx";
import KasegiPage from "./KasegiPage";
import KasegiIndexPage from "./KasegiPage/KasegiIndexPage.jsx";
import KasegiNewPage from "./KasegiNewPage";
import ListPage from "./ListPage";
import SkillPageContainer, { SavedSkillPageContainer } from "./SkillPage";
import SharedSongsPage from "./SharedSongsPage";
import ErrorListPage from "./ErrorListPage";
import theme from "../theme.js";
import { Helmet } from "react-helmet";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core";

function App({ initialThemeKey = "default" }) {
  const [themeKey, setThemeKey] = useState(initialThemeKey);

  useEffect(() => {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme[themeKey]}>
      <MuiThemeProvider
        theme={createTheme({
          palette: {
            type: themeKey === "dark" ? "dark" : "light"
          }
        })}
      >
        <Background>
          <MainContainer>
            <Helmet>
              <style>{`
              a {
                color: ${theme[themeKey].link};
                text-decoration: none;
              }
              body {
                margin: 0;
                color: ${theme[themeKey].main};
                background: ${theme[themeKey].mainBg};
              }
            `}</style>
            </Helmet>
            <Route
              path="/:locale"
              component={props => (
                <AppHeader {...props} setThemeKey={setThemeKey} />
              )}
            />
            <Switch>
              <Route exact path="/:locale" component={IndexPage} />
              <Route
                exact
                path="/:locale/uservoice"
                component={UserVoicePage}
              />
              <Route
                exact
                path="/:locale/errorlist"
                component={ErrorListPage}
              />
              <Route
                exact
                path="/:locale/:version/kasegi/:type/:scope"
                component={KasegiNewPage}
              />
              <Route
                exact
                path="/:locale/:version/kasegi_old"
                component={KasegiIndexPage}
              />
              <Route
                exact
                path="/:locale/:version/kasegi_old/:type/:scope"
                component={KasegiPage}
              />
              <Route exact path="/:locale/:version/list" component={ListPage} />
              <Route
                exact
                path="/:locale/:version/userlist"
                component={props => <ListPage {...props} isAdmin />}
              />
              <Route
                exact
                path="/:locale/:version/:skillId/p"
                component={SavedSkillPageContainer}
              />
              <Route
                exact
                path="/:locale/:version/:playerId/:type"
                component={SkillPageContainer}
              />
              <Route
                exact
                path="/:locale/shared/:type"
                component={SharedSongsPage}
              />
            </Switch>
          </MainContainer>
        </Background>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

const Background = styled.div`
  min-height: 100vh;
  padding: 8px;
  box-sizing: border-box;
`;

const MainContainer = styled.div`
  font-family: verdana;
  font-size: 16px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 742px) {
    font-size: 14px;
  }
`;

export default withRouter(App);
