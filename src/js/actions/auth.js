import { LOGIN, LOGOUT } from 'actions/actions';

export const login = user => ({
  type: LOGIN,
  user,
});

export const logout = () => ({
  type: LOGOUT,
});
