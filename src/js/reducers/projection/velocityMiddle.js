const initialState = 15;

const velocityMiddle = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECTION_VELOCITY_MIDDLE': {
    return action.value;
  }
  default: return state;
  }
};

export default velocityMiddle;
