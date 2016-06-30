import $ from 'jquery';

export const fetchProjectList = () => (dispatch) => {
  dispatch({
    type: 'FETCH_PROJECTS_REQUEST',
  });

  return $.get('http://localhost:6565/project')
    .done(
      data => {
        dispatch({
          type: 'FETCH_PROJECTS_SUCCESS',
          projectList: data,
        });
      })
      .fail(() => {
        dispatch({
          type: 'FETCH_PROJECTS_FAILURE',
          errorMessage: 'There was an error.',
        });
      });
};

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
