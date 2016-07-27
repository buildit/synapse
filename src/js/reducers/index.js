import { combineReducers } from 'redux';
import appData from './appData';
import ui from './ui';

const reducers = {
  ui,
  appData,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
