import {
  FETCH_PROJECTS_RECEIVE,
  FETCH_PROJECTS,
  FETCH_STARTER_PROJECTS_REQUEST,
  FETCH_STARTER_PROJECTS_RECEIVE,
  FETCH_PROJECTION_REQUEST,
  FETCH_PROJECTION_SUCCESS,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  SAVE_PROJECTION_REQUEST,
  SAVE_PROJECT_REQUEST,
  SET_MESSAGE,
  SET_ERROR_MESSAGE,
  RESET_PROJECT,
  UPDATE_PROJECTION_ITERATION_LENGTH,
  SET_IS_NEW_PROJECT,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECTION_START_DATE,
  SET_HAS_PROJECTION,
  SWITCH_VIEW,
  SHOW_MODAL,
  HIDE_MODAL,
  INITIALIZE_NEW_PROJECT,
  UPDATE_FORM_DATA,
  INITIALIZE_FORM_DATA,
  REMOVE_LIST_ITEM,
  ADD_DEMAND_FLOW_LIST_ITEM,
  ADD_DEFECT_FLOW_LIST_ITEM,
  ADD_ROLE_LIST_ITEM,
  ADD_SEVERITY_LIST_ITEM,
  MOVE_LIST_ITEM_UP,
  MOVE_LIST_ITEM_DOWN,
  UPDATE_PROJECTION_VELOCITY_START,
  UPDATE_PROJECTION_VELOCITY_MIDDLE,
  UPDATE_PROJECTION_VELOCITY_END,
  UPDATE_PROJECTION_PERIOD_START,
  UPDATE_PROJECTION_PERIOD_END,
  UPDATE_PROJECTION_BACKLOG_SIZE,
  UPDATE_PROJECTION_DARK_MATTER,
} from './actions';
import { browserHistory } from 'react-router';

export const receiveProjects = response => ({
  type: FETCH_PROJECTS_RECEIVE,
  response,
});

export const receiveStarterProjects = response => ({
  type: FETCH_STARTER_PROJECTS_RECEIVE,
  response,
});

export const setErrorMessage = message => ({
  type: SET_ERROR_MESSAGE,
  message,
});

export const onSwitchView = view => {
  /* eslint-disable no-console */
  console.log('onSwitchView has been deprecated. Please use switchLocation instead.');
  /* eslint-enable no-console */
  return ({
    type: SWITCH_VIEW,
    view,
  });
};

export const switchLocation = location => {
  // This probably isn't the right way to do this.
  browserHistory.push(location);
};

export const showModal = (modal, project) => ({
  type: SHOW_MODAL,
  modal,
  project,
});

export const hideModal = modal => ({
  type: HIDE_MODAL,
  modal,
});

export const fetchProjects = () => ({
  type: FETCH_PROJECTS,
});

export const fetchStarterProjects = () => ({
  type: FETCH_STARTER_PROJECTS_REQUEST,
});

export const fetchProject = name => ({
  type: FETCH_PROJECT_REQUEST,
  name,
});

export const saveFormData = project => ({
  type: SAVE_PROJECT_REQUEST,
  project,
});

export const initializeNewProject = harvestId => ({
  type: INITIALIZE_NEW_PROJECT,
  harvestId,
});

export const onInputChange = (section, key, value) => ({
  type: UPDATE_FORM_DATA,
  section,
  key,
  value,
});

export const initializeFormData = project => ({
  type: INITIALIZE_FORM_DATA,
  project,
});

export const onListItemRemove = (section, list, index) => ({
  type: REMOVE_LIST_ITEM,
  section,
  list,
  index,
});

export const addItemToDemandFlowList = name => ({
  type: ADD_DEMAND_FLOW_LIST_ITEM,
  name,
});

export const addItemToDefectFlowList = name => ({
  type: ADD_DEFECT_FLOW_LIST_ITEM,
  name,
});

export const addItemToRoleList = (name, groupWith) => ({
  type: ADD_ROLE_LIST_ITEM,
  name,
  groupWith,
});

export const addItemToSeverityList = (name, groupWith) => ({
  type: ADD_SEVERITY_LIST_ITEM,
  name,
  groupWith,
});

export const moveListItemUp = (section, list, index) => ({
  type: MOVE_LIST_ITEM_UP,
  section,
  list,
  index,
});

export const moveListItemDown = (section, list, index) => ({
  type: MOVE_LIST_ITEM_DOWN,
  section,
  list,
  index,
});

export const updateProjectionVelocityStart = value => ({
  type: UPDATE_PROJECTION_VELOCITY_START,
  value,
});

export const updateProjectionVelocityMiddle = value => ({
  type: UPDATE_PROJECTION_VELOCITY_MIDDLE,
  value,
});

export const updateProjectionVelocityEnd = value => ({
  type: UPDATE_PROJECTION_VELOCITY_END,
  value,
});

export const updateProjectionPeriodStart = value => ({
  type: UPDATE_PROJECTION_PERIOD_START,
  value,
});

export const updateProjectionPeriodEnd = value => ({
  type: UPDATE_PROJECTION_PERIOD_END,
  value,
});

export const updateProjectionBacklogSize = value => ({
  type: UPDATE_PROJECTION_BACKLOG_SIZE,
  value,
});

export const updateProjectionDarkMatter = value => ({
  type: UPDATE_PROJECTION_DARK_MATTER,
  value,
});

export const updateProjectionIterationLength = value => ({
  type: UPDATE_PROJECTION_ITERATION_LENGTH,
  value,
});

export const updateProjectionStartDate = value => ({
  type: UPDATE_PROJECTION_START_DATE,
  value,
});

export const setHasProjection = () => ({
  type: SET_HAS_PROJECTION,
  value: true,
});

export const setDoesNotHaveProjection = () => ({
  type: SET_HAS_PROJECTION,
  value: false,
});

export const setMessage = message => ({
  type: SET_MESSAGE,
  message,
});
export const clearMessage = () => ({
  type: SET_MESSAGE,
  message: '',
});

export const fetchProjection = name => ({
  type: FETCH_PROJECTION_REQUEST,
  name,
});
export const fetchProjectionSuccess = project => ({
  type: FETCH_PROJECTION_SUCCESS,
  project,
});
export const fetchProjectSuccess = project => ({
  type: FETCH_PROJECT_SUCCESS,
  project,
});

export const saveProjection = (projection, name) => ({
  type: SAVE_PROJECTION_REQUEST,
  projection,
  name,
});

export const updateProject = project => ({
  type: UPDATE_PROJECT_REQUEST,
  project,
});

export const dismissMessage = () => ({
  type: SET_MESSAGE,
  message: '',
});

export const resetProject = () => ({ type: RESET_PROJECT });

export const setIsNewProject = value => ({
  type: SET_IS_NEW_PROJECT,
  value,
});

export const updateProjection = projection => ({
  type: 'UPDATE_PROJECTION',
  projection,
});
