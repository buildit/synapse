import $ from 'jquery';

const initialState = {
  view: 'LIST_VIEW',
  projectList: [],
};

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LIST_VIEW': {
    console.log('change to list view');
    $.get('http://localhost:6565/project').done((data) => {
      console.log(data);
      return {
        ...state,
        projectList: data,
      };
    });
    break;
  }
  default:
  }
  return state;
};

export default viewReducer;
