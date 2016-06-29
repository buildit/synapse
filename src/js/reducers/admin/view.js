const initialState = {
  view: 'LIST_VIEW',
};

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LIST_VIEW': {
    return state;
  }
  default:
  }
  return state;
};

export default viewReducer;
