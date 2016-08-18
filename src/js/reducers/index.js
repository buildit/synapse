import { combineReducers } from 'redux';
import appData from './appData';
import ui from './ui';
import projection from './projection';
import isNewProject from './isNewProject';

const reducers = {
  ui,
  appData,
  projection,
  isNewProject,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
