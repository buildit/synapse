const initialState = 3;

const velocityEnd = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECTION_VELOCITY_END': {
    return action.value;
  }
  default: return state;
  }
};

export default velocityEnd;
