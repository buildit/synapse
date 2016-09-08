import { SET_HAS_PROJECTION } from '../actions/actions';

const initialValue = false;

const hasProjection = (state = initialValue, action) => {
  switch (action.type) {
  case SET_HAS_PROJECTION: return action.value;
  default: return state;
  }
};

export default hasProjection;
