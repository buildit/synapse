import moment from 'moment';

const initialState = moment('01-Aug-16', 'DD-MMM-YY').format('YYYY-MM-DD');

const startDate = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROJECTION_START_DATE': {
    return action.value;
  }
  default: return state;
  }
};

export default startDate;
