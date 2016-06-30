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

const uiReducer = (state = { view: 'LIST_VIEW', errorMsg: null }, action) => {
  switch (action.type) {
  case 'LIST_VIEW': {
    return state;
  }
  default:
  }
  return state;
};

const reducers = {
  ui: uiReducer,
  appData: appDataReducer,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;

