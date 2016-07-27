import blankProject from '../helpers/blankProject';
import normalizeProject from '../helpers/normalizeProject';
import normalizeDemandData from '../helpers/normalizeDemandData';
import normalizeDefectData from '../helpers/normalizeDefectData';
import normalizeEffortData from '../helpers/normalizeEffortData';
import _ from 'lodash';

const appData = (state = {
  isFetching: false,
  starterProjectList: [],
  demandStatus: [],
  effortStatus: [],
  defectStatus: [],
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
    const normalizedStatusData =
      normalizeDemandData()
        .datum(action.statusData)
        .fill()
        .sort()
        .transform()
        .getData();

    return {
      ...state,
      demandStatus: normalizedStatusData,
      isFetching: false,
    };
  }
  case 'FETCH_DEFECT_SUCCESS': {
    const normalizedDefectData =
      normalizeDefectData()
        .datum(action.statusDefectData)
        .sort()
        .transform()
        .getData();
    return {
      ...state,
      defectStatus: normalizedDefectData,
      isFetching: false,
    };
  }
  case 'FETCH_EFFORT_SUCCESS': {
    const normalizedEffortData =
      normalizeEffortData()
        .datum(action.statusEffortData)
        .sort()
        .transform()
        .getData();
    return {
      ...state,
      effortStatus: normalizedEffortData,
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

export default appData;
