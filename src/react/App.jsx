import React from "react";
import styled from "styled-components";
import { Route, Switch, withRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Index from "./Index.jsx";
import AppHeader from "./AppHeader.jsx";
import UserVoicePage from "./UserVoicePage.jsx";
import KasegiPage from "./KasegiPage";
import ListPage from "./ListPage";
import SkillPageContainer, { SavedSkillPageContainer } from "./SkillPage";
import SharedSongsPage from "./SharedSongsPage";
import ErrorListPage from "./ErrorListPage";
import theme from "../theme.js";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme({
        palette: {
          type: 'dark',
        },
      })}>
        <CssBaseline />
        <ThemeProvider theme={theme.dark}>
          <Background>
            <Main>
              <Route path="/:locale" component={AppHeader} />
              <Switch>
                <Route exact path="/:locale" component={Index} />
                <Route exact path="/:locale/uservoice" component={UserVoicePage} />
                <Route exact path="/:locale/errorlist" component={ErrorListPage} />
                <Route
                  exact
                  path="/:locale/:version/kasegi/:type/:scope"
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
                <Route exact path="/:locale/shared/:type" component={SharedSongsPage} />
              </Switch>
            </Main>
          </Background>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

const Background = styled.div`
  background-color: ${props => props.theme.background};
  min-height: 100vh;
  padding: 16px;
`;

const Main = styled.div`
  font-family: verdana;
  font-size: 16px;
  max-width: 1200px;
  margin: auto;
  
  @media (max-width: 742px) {
    font-size: 14px;
  }
`;

export default withRouter(App);
