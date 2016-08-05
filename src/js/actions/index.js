import {
  FETCH_PROJECTION_REQUEST,
  SAVE_PROJECTION_REQUEST,
  SET_MESSAGE,
  RESET_PROJECT,
  UPDATE_PROJECTION_ZOOM,
} from './actions';

import $ from 'jquery';
const apiBaseUrl = api.baseUrl;
const starterProjectsBaseApiUrl = starterProjectsApi.baseUrl;


const requestProjects = () => (
  { type: 'FETCH_PROJECTS_REQUEST' }
);

const receiveProjects = (response) => (
  {
    type: 'FETCH_PROJECTS_RECEIVE',
    response,
  }
);

const requestStarterProjects = () => (
  { type: 'FETCH_STARTER_PROJECTS_REQUEST' }
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

export const onSwitchView = view => ({
  type: 'SWITCH_VIEW',
  view,
});

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
    .fail(response => {
      dispatch(setErrorMessage(response.responseText));
      dispatch(onSwitchView('error'));
    });
};

export const fetchStarterProjects = () => (dispatch) => {
  dispatch(requestStarterProjects());
  return $.get(`${starterProjectsBaseApiUrl}harvest_project/`)
    .done(response => {
      dispatch(receiveStarterProjects(response));
    })
    .fail(response => {
      dispatch(setErrorMessage(response.responseText));
      dispatch(onSwitchView('error'));
    });
};

export const fetchProject = (id) => (dispatch) => {
  dispatch({
    type: 'FETCH_PROJECT_REQUEST',
  });

  return $.get(`${apiBaseUrl}project/${id}`)
    .done(
      data => {
        dispatch({
          type: 'FETCH_PROJECT_SUCCESS',
          project: data[0],
        });
        dispatch({
          type: 'SWITCH_VIEW',
          view: 'projectView',
        });
      })
      .fail(() => {
        dispatch({
          type: 'FETCH_PROJECT_FAILURE',
          errorMessage: 'There was an error.',
        });
        dispatch({
          type: 'SWITCH_VIEW',
          view: 'error',
        });
      });
};

export const fetchStatus = (id) => (dispatch) => {
  const demandCall = $.get(`${apiBaseUrl}project/${id}/demand`);
  const defectCall = $.get(`${apiBaseUrl}project/${id}/defect`);
  const effortCall = $.get(`${apiBaseUrl}project/${id}/effort`);
  dispatch({
    type: 'FETCH_STATUS_REQUEST',
  });
  $.when(demandCall)
  .done(statusData => {
    dispatch({
      type: 'FETCH_STATUS_SUCCESS',
      statusData,
    });
  })
  .fail(() => {
    dispatch({
      type: 'FETCH_STATUS_FAILURE',
      errorMessage: 'There was an error.',
    });
    dispatch({
      type: 'SWITCH_VIEW',
      view: 'error',
    });
  });
  $.when(defectCall)
  .done(statusDefectData => {
    dispatch({
      type: 'FETCH_DEFECT_SUCCESS',
      statusDefectData,
    });
  })
  .fail(() => {
    dispatch({
      type: 'FETCH_STATUS_FAILURE',
      errorMessage: 'There was an error.',
    });
    dispatch({
      type: 'SWITCH_VIEW',
      view: 'error',
    });
  });
  $.when(effortCall)
  .done(statusEffortData => {
    dispatch({
      type: 'FETCH_EFFORT_SUCCESS',
      statusEffortData,
    });
  })
  .fail(() => {
    dispatch({
      type: 'FETCH_STATUS_FAILURE',
      errorMessage: 'There was an error.',
    });
    dispatch({
      type: 'SWITCH_VIEW',
      view: 'error',
    });
  });
};

export const saveFormData = (project) => (dispatch) => {
  dispatch({
    type: SET_MESSAGE,
    message: `Saving ${project.name}...`,
  });

  return (
    $.ajax({
      type: 'POST',
      url: `${apiBaseUrl}project/${project.id}`,
      data: JSON.stringify(project),
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

export const updateProjectionZoom = (axis, value) => ({
  type: UPDATE_PROJECTION_ZOOM,
  axis,
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
      })
      .fail(() => {
        dispatch({
          type: SET_MESSAGE,
          message: `You're creating a new projection for project ${id}.`,
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

export const dismissMessage = () => (
  {
    type: SET_MESSAGE,
    message: '',
  }
);

export const resetProject = () => ({ type: RESET_PROJECT });
