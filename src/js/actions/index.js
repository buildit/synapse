import $ from 'jquery';

export const fetchProjectList = () => (dispatch) => {
  dispatch({
    type: 'FETCH_PROJECTS_REQUEST',
  });

  return $.get('http://localhost:6565/project').done(
    data => {
      // dispatch action to update data on state
      dispatch({
        type: 'UPDATE_PROJECT_LIST',
        projectList: data,
      });
    });
};
