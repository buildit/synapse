import { UPDATE_PROJECTION_ZOOM } from '../actions/actions';

const initialState = {
  xAxisMax: 120,
  xAxisMaxDate: '2016-12-31',
  yAxisMax: 10,
};

const projectionZoom = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_PROJECTION_ZOOM: {
    if (action.axis === 'date') {
      return {
        ...state,
        xAxisMaxDate: action.value,
      };
    }
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
    return state;
  }
  default: return state;
  }
};

export default projectionZoom;
