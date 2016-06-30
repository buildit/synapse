import { combineReducers } from 'redux';

const appDataReducer = (state = { isFetching: false }, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECT_LIST': {
    return {
      projectList: action.projectList,
    };
  }
  case 'FETCH_PROJECTS_REQUEST': {
    return {
      ...state,
      isFetching: true,
    };
  }
  default:
    return state;
  }
};

export const getProjectListReducer = (state = [], action) => {
  switch (action.type) {
  case 'TO_BE_DETERMINED':
    break;
  default:
  }
  return state;
};

const viewReducer = (state = { view: 'LIST_VIEW' }, action) => {
  switch (action.type) {
  case 'LIST_VIEW': {
    return state;
  }
  default:
  }
  return state;
};

const reducers = {
  view: viewReducer,
  appData: appDataReducer,
  getProjectList: getProjectListReducer,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;

