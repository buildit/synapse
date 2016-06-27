import { combineReducers } from 'redux';
import viewReducer from './admin/view.js';

const reducers = {
  view: viewReducer,
};
module.exports = combineReducers(reducers);
