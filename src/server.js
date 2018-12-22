import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { IntlProvider } from "react-intl";
import flatten from "flat";
import { Helmet } from "react-helmet";
import { matchPath } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import serialize from "serialize-javascript";
import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import jaMessages from "../locales/ja/common.json";
import zhMessages from "../locales/zh/common.json";
import enMessages from "../locales/en/common.json";

import App, { routes } from "./react/App.jsx";
import reducer from "./react/reducer";

const messages = {
  ja: flatten(jaMessages),
  zh: flatten(zhMessages),
  en: flatten(enMessages)
};

const reactRoute = (req, res) => {
  if (req.get("Host") === "gitadora-skill-viewer.herokuapp.com") {
    res.redirect(301, `http://gsv.fun${req.url}`);
  } else {
    // set current language to cookie
    const locale = req.params.locale;
    res.cookie("locale", locale);

    const store = createStore(reducer);

    const promises = [];
    routes.some(route => {
      const match = matchPath(req.path, route);
      if (match && route.loadData) {
        promises.push(route.loadData(store.dispatch, match));
      }
    });

    Promise.all(promises).then(() => {
      // server side rendering

      // for mui components
      const sheetsRegistry = new SheetsRegistry();
      const sheetsManager = new Map();
      const generateClassName = createGenerateClassName();
      const theme = createMuiTheme({});

      // for passing redux preloaded store
      const preloadedState = serialize(store.getState()).replace(/'/g, "\\'");

      const renderedString = renderToString(
        <Provider store={store}>
          <IntlProvider locale={locale} messages={messages[locale]}>
            <StaticRouter location={req.url} context={{}}>
              <JssProvider
                registry={sheetsRegistry}
                generateClassName={generateClassName}
              >
                <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                  <App
                    radiumConfig={{ userAgent: req.headers["user-agent"] }}
                  />
                </MuiThemeProvider>
              </JssProvider>
            </StaticRouter>
          </IntlProvider>
        </Provider>
      );

      // for i18n
      const appString = JSON.stringify({ locale, messages: messages[locale] });
      // for SEO
      const helmet = Helmet.renderStatic();
      // for mui components
      const cssForMui = sheetsRegistry.toString();

      res.render("react", {
        googleSiteVerfication: process.env.GOOGLE_SITE_VERIFICATION,
        helmet,
        content: renderedString,
        appString,
        preloadedState,
        cssForMui
      });
    });
  }
};

export default reactRoute;
