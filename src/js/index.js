import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import configureStore from './stores';
import ProjectList from './components/3-organisms/ProjectList';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ProjectList} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
