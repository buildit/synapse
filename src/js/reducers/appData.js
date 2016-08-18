import blankProject from '../helpers/blankProject';
import normalizeProject from '../helpers/normalizeProject';
import _ from 'lodash';

import {
  RESET_PROJECT,
} from '../actions/actions';

const initialState = {
  project: {
    demand: {
      flow: [],
    },
  },
  projectList: [],
  starterProjectList: [],
  demandStatus: [],
  effortStatus: [],
  defectStatus: [],
  isFetching: false,
};

const appData = (state = initialState, action) => {
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
    return {
      ...state,
      demandStatus: action.statusData,
      isFetching: false,
    };
  }

  case 'FETCH_DEFECT_SUCCESS': {
    return {
      ...state,
      defectStatus: action.statusDefectData,
      isFetching: false,
    };
  }

  case 'FETCH_EFFORT_SUCCESS': {
    return {
      ...state,
      effortStatus: action.statusEffortData,
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
    if (action.harvestIwd) {
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
    }
    return {
      ...state,
      project: starterProject,
    };
  }
  case RESET_PROJECT: {
    return {
      ...state,
      project: blankProject,
    };
  }
  default:
    return state;
  }
};

export default appData;
