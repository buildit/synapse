import { combineReducers } from 'redux';
import appData from './appData';
import ui from './ui';
import isNewProject from './isNewProject';
import hasProjection from './hasProjection';
import isFetching from './isFetching';

const reducers = {
  ui,
  appData,
  isNewProject,
  hasProjection,
  isFetching,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
