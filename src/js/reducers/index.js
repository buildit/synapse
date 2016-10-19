import { combineReducers } from 'redux';
import appData from './appData';
import ui from './ui';
import isNewProject from './isNewProject';
import isFetching from './isFetching';

const reducers = {
  ui,
  appData,
  isNewProject,
  isFetching,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
