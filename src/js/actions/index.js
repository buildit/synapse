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

export const fetchProjects = () => (
  dispatch => {
    dispatch(requestProjects());
    return $.get(`${apiBaseUrl}project/`)
      .done(response => {
        dispatch(receiveProjects(response));
      });
      // handle the error/failure case
  }
);

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
      });
};

export const onSwitchView = view => ({
  type: 'SWITCH_VIEW',
  view,
});
