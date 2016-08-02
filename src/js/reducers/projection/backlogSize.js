const initialState = 450;

const backlogSize = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECTION_BACKLOG_SIZE': {
    return action.value;
  }
  default: return state;
  }
};

export default backlogSize;