import { combineReducers } from 'redux';
import blankProject from '../helpers/blankProject';
import normalizeProject from '../helpers/normalizeProject';
import normalizeDemandData from '../helpers/normalizeDemandData';
import _ from 'lodash';

const appDataReducer = (state = {
  isFetching: false,
  starterProjectList: [],
  demandStatus: [],
}, action) => {
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
  case 'FETCH_STARTER_PROJECTS_REQUEST': {
    return {
      ...state,
      isFetching: true,
    };
  }
  case 'FETCH_STARTER_PROJECTS_RECEIVE': {
    return {
      ...state,
      starterProjectList: action.response,
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
    const project = normalizeProject(action.project);

    return {
      ...state,
      project,
      isFetching: false,
    };
  }
  case 'FETCH_PROJECT_FAILURE': {
    return {
      ...state,
      isFetching: false,
    };
  }
  case 'FETCH_STATUS_REQUEST': {
    return {
      ...state,
      isFetching: true,
    };
  }
  case 'FETCH_STATUS_SUCCESS': {
    const normalizedStatusData = normalizeDemandData(action.statusData);
    return {
      ...state,
      demandStatus: normalizedStatusData,
      isFetching: false,
    };
  }
  case 'FETCH_STATUS_FAILURE': {
    return {
      ...state,
      isFetching: false,
    };
  }
  case 'INITIALIZE_NEW_PROJECT': {
    const starterProject = blankProject;
    let harvestProject;
    state.starterProjectList.forEach(project => {
      if (project.id === action.harvestId) {
        harvestProject = project;
      }
    });
    _.forIn(harvestProject, (value, key) => {
      if (harvestProject[key]) {
        starterProject[key] = harvestProject[key];
      }
    });
    return {
      ...state,
      project: starterProject,
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
  case 'REMOVE_LIST_ITEM': {
    let newList = state.formData[action.section][action.list];
    newList = newList.slice(0, action.index).concat(newList.slice(action.index + 1));
    const newFormData = state.formData;
    newFormData[action.section][action.list] = newList;
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'MOVE_LIST_ITEM_UP': {
    if (action.index === 0) {
      return {
        ...state,
      };
    }
    const newList = state.formData[action.section][action.list];
    const temp = newList[action.index - 1];
    newList[action.index - 1] = newList[action.index];
    newList[action.index] = temp;
    const newFormData = state.formData;
    newFormData[action.section][action.list] = newList;
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'MOVE_LIST_ITEM_DOWN': {
    const newList = state.formData[action.section][action.list];
    if (action.index >= newList.length - 1) {
      return {
        ...state,
      };
    }
    const temp = newList[action.index + 1];
    newList[action.index + 1] = newList[action.index];
    newList[action.index] = temp;
    const newFormData = state.formData;
    newFormData[action.section][action.list] = newList;
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'ADD_DEMAND_FLOW_LIST_ITEM': {
    const newFormData = state.formData;
    newFormData.demand.flow.push({ name: action.name });
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'ADD_DEFECT_FLOW_LIST_ITEM': {
    const newFormData = state.formData;
    newFormData.defect.flow.push({ name: action.name });
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'ADD_ROLE_LIST_ITEM': {
    const newFormData = state.formData;
    newFormData.effort.role.push({ name: action.name, groupWith: action.groupWith });
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'ADD_SEVERITY_LIST_ITEM': {
    const newFormData = state.formData;
    newFormData.defect.severity.push({ name: action.name, groupWith: action.groupWith });
    return {
      ...state,
      formData: newFormData,
    };
  }
  case 'SHOW_MODAL': {
    return {
      ...state,
      modalMessage: action.modal,
    };
  }

  case 'HIDE_MODAL': {
    return {
      ...state,
      modalMessage: '',
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
