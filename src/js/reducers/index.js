import { combineReducers } from 'redux';
import appData from './appData';
import ui from './ui';
import projection from './projection';
import isNewProject from './isNewProject';
import hasProjection from './hasProjection';

const reducers = {
  ui,
  appData,
  projection,
  isNewProject,
  hasProjection,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
