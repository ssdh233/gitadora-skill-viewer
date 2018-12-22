import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { IntlProvider, addLocaleData } from "react-intl";
import enLocale from "react-intl/locale-data/en";
import jaLocale from "react-intl/locale-data/ja";
import zhLocale from "react-intl/locale-data/zh";

import App from "./react/App.jsx";
import reducer from "./react/reducer";

// TODO why this is needed?
addLocaleData([...enLocale, ...jaLocale, ...zhLocale]);

const { locale, messages } = JSON.parse(window.App);

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = eval(`(${window.__PRELOADED_STATE__})`);
const store = createStore(reducer, preloadedState);

delete window.__PRELOADED_STATE__;
delete window.App;

hydrate(
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById("app")
);
