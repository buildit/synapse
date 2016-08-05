import { UPDATE_PROJECTION_ZOOM } from '../actions/actions';

const initialState = {
  xAxisMax: 175,
  yAxisMax: 475,
};

const projectionZoom = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_PROJECTION_ZOOM: {
    if (action.axis === 'x') {
      return {
        ...state,
        xAxisMax: action.value,
      };
    }
    if (action.axis === 'y') {
      return {
        ...state,
        yAxisMax: action.value,
      };
    }
  }
  default: return state;
  }
};

export default projectionZoom;
