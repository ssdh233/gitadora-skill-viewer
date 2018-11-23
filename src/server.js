import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { IntlProvider } from "react-intl";
import flatten from "flat";
import { Helmet } from "react-helmet";

import jaMessages from "./public/locales/ja/common.json";
import zhMessages from "./public/locales/zh/common.json";
import enMessages from "./public/locales/en/common.json";

import { App } from "./react/App.jsx";

global.window = {};

const messages = {
  ja: flatten(jaMessages),
  zh: flatten(zhMessages),
  en: flatten(enMessages)
};

const reactRoute = (req, res) => {
  if (req.get("Host") === "gitadora-skill-viewer.herokuapp.com") {
    res.redirect(301, `http://gsv.fun${req.url}`);
  } else {
    const locale = req.params.locale;
    res.cookie("locale", locale);

    const renderedString = renderToString(
      <IntlProvider locale={locale} messages={messages[locale]}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </IntlProvider>
    );
    const appString = JSON.stringify({ locale, messages: messages[locale] });
    const helmet = Helmet.renderStatic();

    res.render("react", {
      googleSiteVerfication: process.env.GOOGLE_SITE_VERIFICATION,
      helmet,
      content: renderedString,
      appString
    });
  }
};

export default reactRoute;
