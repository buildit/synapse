import { combineReducers } from 'redux';

const appDataReducer = (state = { isFetching: false }, action) => {
  switch (action.type) {
  case 'FETCH_PROJECTS_REQUEST': {
    return {
      ...state,
      isFetching: true,
    };
  }
  case 'FETCH_PROJECTS_RECEIVE': {
    console.log(action);
    return {
      ...state,
      projectList: action.response,
      isFetching: false,
    };
  }
  case 'FETCH_PROJECT_REQUEST': {
    return {
      ...state,
      isFetching: true,
    };
  }
  case 'FETCH_PROJECT_SUCCESS': {
    return {
      ...state,
      project: action.project,
      isFetching: false,
    };
  }
  case 'FETCH_PROJECT_FAILURE': {
    return {
      ...state,
      isFetching: false,
    };
  }
  default:
    return state;
  }
};

const uiReducer = (state = { view: 'listView', errorMessage: null }, action) => {
  switch (action.type) {
  case 'FETCH_PROJECTS_FAILURE': {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  }
  case 'FETCH_PROJECT_FAILURE': {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  }
  case 'SWITCH_VIEW': {
    return {
      ...state,
      view: action.view,
    };
  }
  default:
    return state;
  }
};

const reducers = {
  ui: uiReducer,
  appData: appDataReducer,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
