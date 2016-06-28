import { combineReducers } from 'redux';
import viewReducer from './admin/view.js';
import appDataReducer from './admin/appData.js';

const reducers = {
  view: viewReducer,
  appData: appDataReducer,
};
module.exports = combineReducers(reducers);
