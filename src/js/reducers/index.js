import { combineReducers } from 'redux';
import { project } from './project';
import { projects } from './projects';
import { status } from './status';
import { xhr } from './xhr';
import { messages } from './messages';
import { auth } from './auth';

const reducers = {
  project,
  projects,
  status,
  xhr,
  messages,
  auth,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
