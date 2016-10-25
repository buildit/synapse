import { combineReducers } from 'redux';
import ui from './ui';
import { project } from './project';
import { projects } from './projects';
import { status } from './status';
import { xhr } from './xhr';
import { messages } from './messages';
import { form } from './form';

const reducers = {
  ui,
  project,
  projects,
  status,
  xhr,
  messages,
  form,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
