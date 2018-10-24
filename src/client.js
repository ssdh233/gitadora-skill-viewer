import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import flatten from "flat";
import enLocale from "react-intl/locale-data/en";
import jaLocale from "react-intl/locale-data/ja";
import zhLocale from "react-intl/locale-data/zh";

import jaMessages from "./public/locales/ja/common.json";
import zhMessages from "./public/locales/zh/common.json";
import enMessages from "./public/locales/en/common.json";

import { App } from "./react/App.jsx";

addLocaleData([...enLocale, ...jaLocale, ...zhLocale]);

// const messages = {
//   ja: flatten(jaMessages),
//   zh: flatten(zhMessages),
//   en: flatten(enMessages)
// };

// const { locale } = window.App;
const { locale, messages } = JSON.parse(window.App);

render(
  <IntlProvider locale={locale} messages={messages}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </IntlProvider>,
  document.getElementById("app")
);
