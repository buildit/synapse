import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import ProjectList from './components/3-organisms/ProjectList';
import Project from './components/3-organisms/Project';
import EditProject from './components/3-organisms/EditProject';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectList} />
    <Route path="/:projectId" component={Project} />
    <Route path="/:projectId/edit" component={EditProject} />
  </Route>
);
