const initialState = 7;

const periodStart = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECTION_PERIOD_START': {
    return action.value;
  }
  default: return state;
  }
};

export default periodStart;
