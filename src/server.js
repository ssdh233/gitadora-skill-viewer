import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { IntlProvider, addLocaleData } from "react-intl";
import flatten from "flat";
import enLocale from "react-intl/locale-data/en";
import jaLocale from "react-intl/locale-data/ja";
import zhLocale from "react-intl/locale-data/zh";

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

let serverSideRendering = ({ locale }) => {
  return {
    renderedString: renderToString(
      <IntlProvider locale={locale} messages={messages[locale]}>
        <StaticRouter location={`/${locale}`} context={{}}>
          <App />
        </StaticRouter>
      </IntlProvider>
    ),
    appString: JSON.stringify({ locale, messages: messages[locale] })
  };
};

export default serverSideRendering;
