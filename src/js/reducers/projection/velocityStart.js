const initialState = 3;

const velocityStart = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECTION_VELOCITY_START': {
    return action.value;
  }
  default: return state;
  }
};

export default velocityStart;
