const initialState = 3;

const periodEnd = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECTION_PERIOD_END': {
    return action.value;
  }
  default: return state;
  }
};

export default periodEnd;
