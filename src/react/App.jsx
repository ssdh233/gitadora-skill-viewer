import React from "react";
import { render } from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import Index from "./Index.jsx";

injectTapEventPlugin();

class App extends React.Component {
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <MuiThemeProvider>
          <Router>
            <div>
              <Route path="/" component={Index} />
            </div>
          </Router>
        </MuiThemeProvider>
      </I18nextProvider>
    );
  }
}

render(<App />, document.getElementById("app"));
