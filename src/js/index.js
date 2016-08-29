import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import configureStore from './stores';
import ProjectList from './components/3-organisms/ProjectList';
import Project from './components/3-organisms/Project';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ProjectList} />
      <Route path="/(:projectId)" component={Project} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
