import blankProject from 'helpers/blankProject';

import {
  FETCH_PROJECT_SUCCESS,
  RESET_PROJECT,
} from 'actions/actions';

export const initialState = blankProject;

export const project = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECTION': {
    return {
      ...state,
      projection: action.projection,
    };
  }
  case FETCH_PROJECT_SUCCESS: {
    const fetchedProject = action.project;
    if (! ('new' in fetchedProject)) {
      fetchedProject.new = false;
    }
    return fetchedProject;
  }
  case RESET_PROJECT: {
    const resetProject = blankProject;
    resetProject.new = true;
    return resetProject;
  }
  default: return state;
  }
};
