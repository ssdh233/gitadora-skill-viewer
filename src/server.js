import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { IntlProvider } from "react-intl";
import flatten from "flat";
import { Helmet } from "react-helmet";
import { ServerStyleSheets as MuiServerStyleSheets } from "@material-ui/styles";
import { ApolloProvider } from "@apollo/react-common";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { getDataFromTree } from "@apollo/react-ssr";
import fetch from "node-fetch";
import { ServerStyleSheet } from "styled-components";

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
    const client = new ApolloClient({
      ssrMode: true,
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: `${process.env.APP_URL}/graphql`,
        fetch
      })
    });
    const sheet = new ServerStyleSheet();
    const muiSheet = new MuiServerStyleSheets();

    let Temp = sheet.collectStyles(
      muiSheet.collect(
        <ApolloProvider client={client}>
          <IntlProvider locale={locale} messages={messages[locale]}>
            <StaticRouter location={req.url} context={{}}>
              <App radiumConfig={{ userAgent: req.headers["user-agent"] }} />
            </StaticRouter>
          </IntlProvider>
        </ApolloProvider>
      )
    );

    getDataFromTree(Temp).then(() => {
      const renderedString = renderToString(Temp);

      // for styled component
      const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
      const cssForMui = muiSheet.toString();

      // for i18n
      const appString = JSON.stringify({
        locale,
        messages: messages[locale]
      });
      // for SEO
      const helmet = Helmet.renderStatic();

      const html = htmlTemplate({
        googleSiteVerfication: process.env.GOOGLE_SITE_VERIFICATION,
        helmet,
        content: renderedString,
        appString,
        bundleFileName,
        client,
        styleTags,
        cssForMui
      });
      res.send(html);
    });
  }
};

export default reactRoute;
