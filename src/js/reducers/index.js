import { combineReducers } from 'redux';
import appData from './appData';
import ui from './ui';
import projection from './projection';
import projectionZoom from './projectionZoom';

const reducers = {
  ui,
  appData,
  projection,
  projectionZoom,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
