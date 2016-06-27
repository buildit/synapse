const viewReducer = (state = 'NOTHING', action) => {
  switch (action.type) {
  case 'LIST_VIEW': {
    console.log('change to list view');
    break;
  }
  default:
  }
  return state;
};

export default viewReducer;
