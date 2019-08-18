import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { IntlProvider } from "react-intl";
import flatten from "flat";
import { Helmet } from "react-helmet";
import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/react-common";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { getDataFromTree } from "@apollo/react-ssr";
import fetch from "node-fetch";

import jaMessages from "../locales/ja/common.json";
import zhMessages from "../locales/zh/common.json";
import enMessages from "../locales/en/common.json";

import htmlTemplate from "./views/htmlTemplate";
import App from "./react/App.jsx";

const bundleFileName = readBundleFileNameFromManifest();

function readBundleFileNameFromManifest() {
  let bundleFileName;
  try {
    let stats = JSON.parse(
      require("fs")
        .readFileSync("./src/public/bundle/manifest.json")
        .toString()
    );
    bundleFileName = stats["bundle.js"];
  } catch (e) {
    console.error("Failes to load stats file", e);
  }
  return bundleFileName;
}

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

    // for mui components
    const sheetsRegistry = new SheetsRegistry();
    const sheetsManager = new Map();
    const generateClassName = createGenerateClassName();
    const theme = createMuiTheme({});

    const client = new ApolloClient({
      ssrMode: true,
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: `${process.env.APP_URL}/graphql`,
        fetch
      })
    });

    const Temp = (
      <ApolloProvider client={client}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <StaticRouter location={req.url} context={{}}>
            <JssProvider
              registry={sheetsRegistry}
              generateClassName={generateClassName}
            >
              <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <App radiumConfig={{ userAgent: req.headers["user-agent"] }} />
              </MuiThemeProvider>
            </JssProvider>
          </StaticRouter>
        </IntlProvider>
      </ApolloProvider>
    );

    getDataFromTree(Temp).then(() => {
      const renderedString = renderToString(Temp);

      // for i18n
      const appString = JSON.stringify({
        locale,
        messages: messages[locale]
      });
      // for SEO
      const helmet = Helmet.renderStatic();
      // for mui components
      const cssForMui = sheetsRegistry.toString();

      const html = htmlTemplate({
        googleSiteVerfication: process.env.GOOGLE_SITE_VERIFICATION,
        helmet,
        content: renderedString,
        appString,
        cssForMui,
        bundleFileName,
        client
      });
      res.send(html);
    });
  }
};

export default reactRoute;
