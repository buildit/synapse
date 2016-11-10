import {
  FETCH_PROJECTS_RECEIVE,
  FETCH_STARTER_PROJECTS_RECEIVE,
} from 'actions/actions';

export const initialState = {
  projectList: [],
  starterProjectList: [],
};

export const projects = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PROJECTS_RECEIVE: {
    return {
      ...state,
      projectList: action.response,
    };
  }
  case FETCH_STARTER_PROJECTS_RECEIVE: {
    return {
      ...state,
      starterProjectList: action.response,
    };
  }
  default: return state;
  }
};
