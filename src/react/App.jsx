import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Router, Route, hashHistory } from 'react-router';
import Index from './Index.jsx';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

injectTapEventPlugin();

class App extends React.Component {

  render () {
    return (
      <I18nextProvider i18n={ i18n }>
        <Router history={hashHistory}>
          <Route path="/" component={Index}/>
        </Router>
      </I18nextProvider>
    );
  }
}

render(<App/>, document.getElementById('app'));