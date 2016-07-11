import $ from 'jquery';
const apiBaseUrl = require('../../../config/development.json').api.baseUrl;

const requestProjects = () => (
  { type: 'FETCH_PROJECTS_REQUEST' }
);

const receiveProjects = (response) => (
  {
    type: 'FETCH_PROJECTS_RECEIVE',
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
