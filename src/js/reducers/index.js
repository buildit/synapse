import { combineReducers } from 'redux';
import appData from './appData';
import ui from './ui';
import projection from './projection';

const reducers = {
  ui,
  appData,
  projection,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
