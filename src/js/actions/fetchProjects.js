import { FETCH_PROJECTS } from './actions';
export const fetchProjects = () => (dispatch) => {
  dispatch({
    type: FETCH_PROJECTS
  });
};
