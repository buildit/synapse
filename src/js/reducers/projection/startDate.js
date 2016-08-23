import moment from 'moment';

const initialState = moment().format('YYYY-MM-DD');

const startDate = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECTION_START_DATE': {
    return action.value;
  }
  default: return state;
  }
};

export default startDate;
