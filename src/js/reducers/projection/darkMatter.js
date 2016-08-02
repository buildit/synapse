const initialState = 10;

const darkMatter = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECTION_DARK_MATTER': {
    return action.value;
  }
  default: return state;
  }
};

export default darkMatter;
