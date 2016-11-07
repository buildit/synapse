import { combineReducers } from 'redux';
import { project } from './project';
import { projects } from './projects';
import { status } from './status';
import { xhr } from './xhr';
import { messages } from './messages';

const reducers = {
  project,
  projects,
  status,
  xhr,
  messages,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
