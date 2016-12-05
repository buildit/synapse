import {
  LOGIN,
  LOGOUT,
} from 'actions/actions';

const userIsAuthenticated = user => (user && user.name === 'Paul');

export const initialState = {
  isAuthenticated: false,
  message: '',
  user: {
    name: '',
    password: '',
  },
};

export const auth = (state = initialState, action) => {
  switch (action.type) {

  case LOGIN: {
    if (userIsAuthenticated(action.user)) {
      return {
        isAuthenticated: true,
        user: action.user,
      };
    }
    return {
      isAuthenticated: false,
      message: 'Login failed',
    };
  }

  case LOGOUT: {
    return initialState;
  }

  default: return state;
  }
};
