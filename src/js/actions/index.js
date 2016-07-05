import $ from 'jquery';

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
    return $.get('http://localhost:6565/project/')
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

  return $.get(`http://localhost:6565/project/${id}`)
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
