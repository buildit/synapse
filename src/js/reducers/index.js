import { combineReducers } from 'redux';
import viewReducer from './admin/view.js';
import appDataReducer from './admin/appData.js';
import getProjectListReducer from './admin/getProjectList.js';

const reducers = {
  view: viewReducer,
  appData: appDataReducer,
  getProjectList: getProjectListReducer,
};

module.exports = combineReducers(reducers);
