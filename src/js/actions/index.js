import {
  FETCH_PROJECTS,
  FETCH_PROJECTION_REQUEST,
  FETCH_PROJECTION_SUCCESS,
  FETCH_PROJECT_SUCCESS,
  SAVE_PROJECTION_REQUEST,
  SET_MESSAGE,
  RESET_PROJECT,
  UPDATE_PROJECTION_ITERATION_LENGTH,
  SET_IS_NEW_PROJECT,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECTION_START_DATE,
  SET_HAS_PROJECTION,
} from './actions';
import $ from 'jquery';
import { browserHistory } from 'react-router';

const trimFormInputs = require('../helpers/trimFormInputs');


// const hostname = typeof window === 'undefined' ? 'localhost' : window.location.hostname;
// /* eslint-disable no-console */
// console.log('hostname:', hostname);
// /* eslint-enable no-console */
//
// let configFile = '';
//
// if (hostname.includes('staging')) {
//   configFile = './staging.json';
// } else if (hostname.includes('localhost')) {
//   configFile = './default.json';
// } else {
//   configFile = './production.json';
// }

/* eslint-disable import/no-unresolved */
// const configuration = require(`${configFile}`);
const configuration = require('config');
/* eslint-enable import/no-unresolved */
const apiBaseUrl = configuration.parameters.api.baseUrl;
const starterProjectsBaseApiUrl = configuration.parameters.starterProjectsApi.baseUrl;
const errorHelper = require('../helpers/errorHelper');

export const receiveProjects = (response) => (
  {
    type: 'FETCH_PROJECTS_RECEIVE',
    response,
  }
);

const receiveStarterProjects = (response) => (
  {
    type: 'FETCH_STARTER_PROJECTS_RECEIVE',
    response,
  }
);

export const setErrorMessage = (message) => (
  {
    type: 'SET_ERROR_MESSAGE',
    message,
  }
);

export const onSwitchView = view => {
  /* eslint-disable no-console */
  console.log('onSwitchView has been deprecated. Please use switchLocation instead.');
  /* eslint-enable no-console */
  return ({
    type: 'SWITCH_VIEW',
    view,
  });
};

export const switchLocation = location => {
  // This probably isn't the right way to do this.
  browserHistory.push(location);
};

export const showModal = (modal, project) => ({
  type: 'SHOW_MODAL', modal, project,
});

export const hideModal = (modal) => ({
  type: 'HIDE_MODAL', modal,
});

export const fetchProjects = () => (dispatch) => {
  dispatch({
    type: FETCH_PROJECTS,
  });
};

export const fetchStarterProjects = () => (dispatch) => {
  dispatch({
    type: 'FETCH_STARTER_PROJECTS_REQUEST',
  });

  return $.get(`${starterProjectsBaseApiUrl}v1/project?status=available`)
    .done(response => {
      dispatch(receiveStarterProjects(response));
    })
    .fail(response => {
      dispatch(setErrorMessage(response.responseText));
      dispatch(switchLocation('error'));
    });
};

export const fetchProject = name => dispatch => {
  dispatch({
    type: 'FETCH_PROJECT_REQUEST',
  });
  return $.get(`${apiBaseUrl}v1/project/${name}`)
    .done(
      data => {
        const project = data;
        if (project) {
          dispatch({
            type: 'FETCH_PROJECT_SUCCESS',
            project,
          });
          dispatch({
            type: 'SWITCH_VIEW',
            view: 'projectView',
          });
        } else {
          dispatch(setErrorMessage('We could not fetch the project.'));
          dispatch(switchLocation('error'));
        }
      })
      .fail(() => {
        dispatch(setErrorMessage('We could not fetch the project.'));
        dispatch(switchLocation('error'));
      });
};

export const saveFormData = (project) => (dispatch) => {
  dispatch({
    type: SET_MESSAGE,
    message: `Saving ${project.name}...`,
  });

  const trimmedProject = trimFormInputs(project);

  return (
    $.ajax({
      type: 'POST',
      url: `${apiBaseUrl}v1/project/${project.name}`,
      data: JSON.stringify(trimmedProject),
      contentType: 'application/json',
    })
    .done(() => {
      dispatch(onSwitchView('modalView'));
      dispatch(showModal('SaveConfirmationModal', project));
      dispatch({
        type: SET_MESSAGE,
        message: '',
      });
    })
    .fail(response => {
      dispatch(setErrorMessage(errorHelper(response)));
      dispatch(switchLocation('/error'));
    })
  );
};

export const initializeNewProject = (harvestId) => ({
  type: 'INITIALIZE_NEW_PROJECT',
  harvestId,
});

export const onInputChange = (section, key, value) => ({
  type: 'UPDATE_FORM_DATA',
  section,
  key,
  value,
});

export const initializeFormData = (project) => ({
  type: 'INITIALIZE_FORM_DATA',
  project,
});

export const onListItemRemove = (section, list, index) => ({
  type: 'REMOVE_LIST_ITEM',
  section,
  list,
  index,
});

export const addItemToDemandFlowList = (name) => ({
  type: 'ADD_DEMAND_FLOW_LIST_ITEM',
  name,
});

export const addItemToDefectFlowList = (name) => ({
  type: 'ADD_DEFECT_FLOW_LIST_ITEM',
  name,
});

export const addItemToRoleList = (name, groupWith) => ({
  type: 'ADD_ROLE_LIST_ITEM',
  name,
  groupWith,
});

export const addItemToSeverityList = (name, groupWith) => ({
  type: 'ADD_SEVERITY_LIST_ITEM',
  name,
  groupWith,
});

export const moveListItemUp = (section, list, index) => ({
  type: 'MOVE_LIST_ITEM_UP',
  section,
  list,
  index,
});

export const moveListItemDown = (section, list, index) => ({
  type: 'MOVE_LIST_ITEM_DOWN',
  section,
  list,
  index,
});

export const updateProjectionVelocityStart = value => ({
  type: 'UPDATE_PROJECTION_VELOCITY_START',
  value,
});

export const updateProjectionVelocityMiddle = value => ({
  type: 'UPDATE_PROJECTION_VELOCITY_MIDDLE',
  value,
});

export const updateProjectionVelocityEnd = value => ({
  type: 'UPDATE_PROJECTION_VELOCITY_END',
  value,
});

export const updateProjectionPeriodStart = value => ({
  type: 'UPDATE_PROJECTION_PERIOD_START',
  value,
});

export const updateProjectionPeriodEnd = value => ({
  type: 'UPDATE_PROJECTION_PERIOD_END',
  value,
});

export const updateProjectionBacklogSize = value => ({
  type: 'UPDATE_PROJECTION_BACKLOG_SIZE',
  value,
});

export const updateProjectionDarkMatter = value => ({
  type: 'UPDATE_PROJECTION_DARK_MATTER',
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

export const saveProjection = (projection, name) => dispatch => {
  const projectionToSave = {
    backlogSize: projection.backlogSize,
    darkMatterPercentage: projection.darkMatter,
    iterationLength: projection.iterationLength,
    startVelocity: projection.velocityStart,
    targetVelocity: projection.velocityMiddle,
    startIterations: projection.periodStart,
    endIterations: projection.periodEnd,
    endVelocity: projection.velocityEnd,
    startDate: projection.startDate,
  };
  dispatch({
    type: SAVE_PROJECTION_REQUEST,
  });

  return $.ajax({
    type: 'PUT',
    url: `${apiBaseUrl}v1/project/${name}/projection`,
    data: JSON.stringify(projectionToSave),
    contentType: 'application/json',
    // dataType: 'json',
  })
  .done(() => {
    dispatch({
      type: SET_MESSAGE,
      message: `The projection for project ${name} was saved successfully.`,
    });
  })
  .fail(() => {
    dispatch({
      type: SET_MESSAGE,
      message: 'There was an error. We could not save the projection.',
    });
  });
};

export const updateProject = project => dispatch => {
  dispatch({
    type: UPDATE_PROJECT_REQUEST,
  });

  return $.ajax({
    type: 'PUT',
    url: `${apiBaseUrl}v1/project/${project.name}`,
    data: JSON.stringify(project),
    contentType: 'application/json',
    dataType: 'json',
  })
  .done(() => {
    dispatch({
      type: SET_MESSAGE,
      message: `The form data for project ${name} was saved successfully.`,
    });
  })
  .fail(() => {
    dispatch({
      type: SET_MESSAGE,
      message: 'There was an error. We could not save the project.',
    });
  });
};

export const dismissMessage = () => (
  {
    type: SET_MESSAGE,
    message: '',
  }
);

export const resetProject = () => ({ type: RESET_PROJECT });

export const setIsNewProject = value => (
  {
    type: SET_IS_NEW_PROJECT,
    value,
  }
);
