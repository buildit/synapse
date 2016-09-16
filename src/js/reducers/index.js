import { combineReducers } from 'redux';
import appData from './appData';
import ui from './ui';
import projection from './projection';
import isNewProject from './isNewProject';
import hasProjection from './hasProjection';
import isFetching from './isFetching';

const reducers = {
  ui,
  appData,
  projection,
  isNewProject,
  hasProjection,
  isFetching,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
