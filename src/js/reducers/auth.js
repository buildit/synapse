import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from 'actions/actions';

export const initialState = {
  isAuthenticated: false,
  message: '',
  user: {
    name: '',
  },
};

export const auth = (state = initialState, action) => {
  switch (action.type) {

  case LOGIN_SUCCESS: {
    return {
      isAuthenticated: true,
      user: action.user,
    };
  }

  case LOGIN_FAILURE: {
    return {
      isAuthenticated: false,
      message: 'Wrong email or password',
    };
  }

  case LOGOUT_SUCCESS: {
    return initialState;
  }

  default: return state;
  }
};
