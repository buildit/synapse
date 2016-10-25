import {
  SET_MESSAGE,
} from 'actions/actions';

export const initialState = '';

export const messages = (state = initialState, action) => {
  switch (action.type) {
  case SET_MESSAGE: return action.message;

  default: return state;
  }
};
