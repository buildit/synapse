import { combineReducers } from 'redux';

const appDataReducer = (state = { isFetching: false }, action) => {
  switch (action.type) {
  case 'FETCH_PROJECTS_REQUEST': {
    return {
      ...state,
      projectId: action.projectId,
      isFetching: true,
    };
  }
  case 'FETCH_PROJECTS_RECEIVE': {
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

const uiReducer = (state = {
  view: 'listView',
  errorMessage: null,
  formData: {
    demand: {},
    defect: {},
    effort: {},
  },
}, action) => {
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
  case 'SET_ERROR_MESSAGE': {
    return {
      ...state,
      errorMessage: action.message,
    };
  }
  case 'UPDATE_FORM_DATA': {
    const newFormData = state.formData;
    switch (action.section) {
    case 'header': {
      newFormData[action.key] = action.value;
      return {
        ...state,
        formData: newFormData,
      };
    }
    case 'demand': {
      newFormData.demand[action.key] = action.value;
      return {
        ...state,
        formData: newFormData,
      };
    }
    case 'defect': {
      newFormData.defect[action.key] = action.value;
      return {
        ...state,
        formData: newFormData,
      };
    }
    case 'effort': {
      newFormData.effort[action.key] = action.value;
      return {
        ...state,
        formData: newFormData,
      };
    }
    default: return state;
    }
  }
  case 'INITIALIZE_FORM_DATA': {
    return {
      ...state,
      formData: action.project,
    };
  }
  default: return state;
  }
};

const reducers = {
  ui: uiReducer,
  appData: appDataReducer,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
