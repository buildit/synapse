const initialState = {
  view: 'LIST_VIEW',
};

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LIST_VIEW': {
    console.log('change to list view');
    return state;
  }
  default:
  }
  return state;
};

export default viewReducer;
