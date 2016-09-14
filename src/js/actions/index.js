import {
  FETCH_PROJECTION_REQUEST,
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
const isValid = require('../helpers/isValid');

/* eslint-disable import/no-unresolved */
const defaultConfig = require('./default.json');
/* eslint-enable import/no-unresolved */
const apiBaseUrl = defaultConfig.parameters.api.baseUrl;
const starterProjectsBaseApiUrl = defaultConfig.parameters.starterProjectsApi.baseUrl;

const requestProjects = () => (
  { type: 'FETCH_PROJECTS_REQUEST' }
);

const receiveProjects = (response) => (
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

const setErrorMessage = (message) => (
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
  dispatch(requestProjects());
  return $.get(`${apiBaseUrl}project/`)
    .done(response => {
      dispatch(receiveProjects(response));
    })
    .fail(() => {
      dispatch(setErrorMessage('We could not fetch the projects.'));
      dispatch(onSwitchView('error'));
    });
};

export const fetchStarterProjects = () => (dispatch) => {
  dispatch({
    type: 'FETCH_STARTER_PROJECTS_REQUEST',
  });

  return $.get(`${starterProjectsBaseApiUrl}harvest_project/`)
    .done(response => {
      dispatch(receiveStarterProjects(response));
    })
    .fail(response => {
      dispatch(setErrorMessage(response.responseText));
      dispatch(switchLocation('error'));
    });
};

export const fetchProject = (id) => (dispatch) => {
  dispatch({
    type: 'FETCH_PROJECT_REQUEST',
  });
  return $.get(`${apiBaseUrl}project/${id}`)
    .done(
      data => {
        const project = data[0];
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

export const fetchStatus = (id) => (dispatch) => {
  const demandCall = $.get(`${apiBaseUrl}project/${id}/demand`);
  const defectCall = $.get(`${apiBaseUrl}project/${id}/defect`);
  const effortCall = $.get(`${apiBaseUrl}project/${id}/effort`);

  // These endpoints provide simplified status data, which is helpful for testing.
  // const demandCall = $.get('https://tonicdev.io/billyzac/57befb878bec6b13001152a9/branches/master/demand');
  // const defectCall = $.get('https://tonicdev.io/billyzac/57befb878bec6b13001152a9/branches/master/defect');
  // const effortCall = $.get('https://tonicdev.io/billyzac/57befb878bec6b13001152a9/branches/master/effort');

  const fetchFailureMessage = `It seems that the data service is unresponsive.
    Please check the data service and make sure it's up and running.`;

  dispatch({ type: 'FETCH_STATUS_REQUEST' });

  $.when(demandCall)
  .done(statusData => {
    if (isValid(statusData, 'demand-status-data')) {
      dispatch({
        type: 'FETCH_STATUS_SUCCESS',
        statusData,
      });
    } else {
      // Don't know why this is not being set.
      dispatch(setErrorMessage('The demand data received from the API was improperly formatted.'));

      // But this works -- it does go to the error route. Hm.
      dispatch(switchLocation('/error'));
    }
  })
  .fail(() => {
    dispatch(setErrorMessage(fetchFailureMessage));
    dispatch(switchLocation('/error'));
  });
  $.when(defectCall)
  .done(statusData => {
    if (isValid(statusData, 'defect-status-data')) {
      dispatch({
        type: 'FETCH_DEFECT_SUCCESS',
        statusData,
      });
    } else {
      dispatch(setErrorMessage('The defect data received from the API was improperly formatted.'));
      dispatch(switchLocation('/error'));
    }
  })
  .fail(() => {
    dispatch(setErrorMessage(fetchFailureMessage));
    dispatch(switchLocation('/error'));
  });
  $.when(effortCall)
  .done(statusData => {
    if (isValid(statusData, 'effort-status-data')) {
      dispatch({
        type: 'FETCH_EFFORT_SUCCESS',
        statusData,
      });
    } else {
      dispatch(setErrorMessage('The effort data received from the API was improperly formatted.'));
      dispatch(switchLocation('/error'));
    }
  })
  .fail(() => {
    dispatch(setErrorMessage(fetchFailureMessage));
    dispatch(switchLocation('/error'));
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
      url: `${apiBaseUrl}project/${project.id}`,
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
      dispatch(setErrorMessage(response.responseText));
      dispatch(onSwitchView('error'));
      dispatch({
        type: SET_MESSAGE,
        message: '',
      });
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

export const fetchProjection = (id) => (dispatch) => {
  dispatch({
    type: FETCH_PROJECTION_REQUEST,
  });

  return $.get(`${apiBaseUrl}project/${id}/forecast`)
    .done(
      projection => {
        dispatch({
          type: 'UPDATE_PROJECTION_BACKLOG_SIZE',
          value: projection.backlogSize,
        });
        dispatch({
          type: 'UPDATE_PROJECTION_VELOCITY_START',
          value: projection.velocityStart,
        });

        dispatch({
          type: 'UPDATE_PROJECTION_VELOCITY_MIDDLE',
          value: projection.velocityMiddle,
        });

        dispatch({
          type: 'UPDATE_PROJECTION_VELOCITY_END',
          value: projection.velocityEnd,
        });

        dispatch({
          type: 'UPDATE_PROJECTION_PERIOD_START',
          value: projection.periodStart,
        });

        dispatch({
          type: 'UPDATE_PROJECTION_PERIOD_END',
          value: projection.periodEnd,
        });

        dispatch({
          type: 'UPDATE_PROJECTION_DARK_MATTER',
          value: projection.darkMatter,
        });

        dispatch({
          type: 'UPDATE_PROJECTION_ITERATION_LENGTH',
          value: projection.iterationLength,
        });

        dispatch({
          type: UPDATE_PROJECTION_START_DATE,
          value: projection.startDate,
        });

        dispatch({
          type: SET_HAS_PROJECTION,
          value: true,
        });
      })
      .fail(() => {
        dispatch({
          type: SET_MESSAGE,
          message: `You're creating a new projection for project ${id}.`,
        });

        dispatch({
          type: SET_HAS_PROJECTION,
          value: false,
        });
      });
};

export const saveProjection = (projection, id) => dispatch => {
  dispatch({
    type: SAVE_PROJECTION_REQUEST,
  });

  return $.ajax({
    type: 'POST',
    url: `${apiBaseUrl}project/${id}/forecast`,
    data: JSON.stringify(projection),
    contentType: 'application/json',
    dataType: 'json',
  })
    .always(response => {
      if (response.status === 200) {
        dispatch({
          type: SET_MESSAGE,
          message: `The projection for project ${id} was saved successfully.`,
        });
      } else {
        dispatch({
          type: SET_MESSAGE,
          message: 'There was an error. We could not save the projection.',
        });
      }
    });
};

export const updateProject = project => dispatch => {
  dispatch({
    type: UPDATE_PROJECT_REQUEST,
  });

  return $.ajax({
    type: 'PUT',
    url: `${apiBaseUrl}project/${project.id}`,
    data: JSON.stringify(project),
    contentType: 'application/json',
    dataType: 'json',
  })
    .always(response => {
      if (response.status === 200) {
        dispatch({
          type: SET_MESSAGE,
          message: `Project ${project.id} was saved successfully.`,
        });
      } else {
        dispatch({
          type: SET_MESSAGE,
          message: 'There was an error. We could not save the project.',
        });
      }
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
