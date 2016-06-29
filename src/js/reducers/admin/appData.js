const initialState = [];

const appDataReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECT_LIST': {
    return {
      projectList: action.projectList,
    };
  }
  case 'FETCH_PROJECTS_REQUEST': {
    return state;
  }
  default:
    return state;
  }
};

export default appDataReducer;
