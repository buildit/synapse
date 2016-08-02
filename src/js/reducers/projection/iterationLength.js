const initialState = 2;

const iterationLength = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECTION_ITERATION_LENGTH': {
    return action.value;
  }
  default: return state;
  }
};

export default iterationLength;
