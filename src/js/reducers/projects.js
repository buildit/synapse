import {
  DELETE_PROJECT_SUCCESS,
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
  case DELETE_PROJECT_SUCCESS: {
    const updatedList = [];
    state.projectList.forEach((iteritem) => {
      if (iteritem.name !== action.name) {
        updatedList.push(iteritem);
      }
    });
    return {
      ...state,
      projectList: updatedList,
    };
  }
  default: return state;
  }
};
