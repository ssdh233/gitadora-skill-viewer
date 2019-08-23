import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import enLocale from "react-intl/locale-data/en";
import jaLocale from "react-intl/locale-data/ja";
import zhLocale from "react-intl/locale-data/zh";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import App from "./react/App.jsx";

// TODO why this is needed?
addLocaleData([...enLocale, ...jaLocale, ...zhLocale]);

const { locale, messages } = JSON.parse(window.App);

const link = new HttpLink({
  uri: "/graphql"
});

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link,
  ssrForceFetchDelay: 100
});

hydrate(
  <ApolloProvider client={client}>
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>
  </ApolloProvider>,
  document.getElementById("app")
);
