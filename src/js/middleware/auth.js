import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import { postLoginRequest } from 'middleware/api';

import { LOGIN_REQUEST, LOGOUT_REQUEST } from 'actions/actions';
import { loginSuccess, loginFailure, logoutSuccess, setMessage } from 'actions';

const getCookie = response => {
  if (response.user && response.user.id) return response.user.id;
  return false;
};

export function* loginRequest(action) {
  try {
    const response = yield call(postLoginRequest, action.user);
    const cookie = getCookie(response);
    if (cookie) {
      Cookies.set('user', cookie);
      const user = {
        name: action.user.email,
      };
      yield put(loginSuccess(user, cookie));
      yield put(setMessage(`Welcome, ${user.name}`));
    } else {
      yield put(loginFailure());
    }
  } catch (e) {
    yield put(loginFailure());
  }
}
export function* watchLoginRequest() {
  yield call(takeEvery, LOGIN_REQUEST, loginRequest);
}

export function* logoutRequest() {
  Cookies.remove('user');
  yield put(logoutSuccess());
  yield put(setMessage('You are logged out'));
}
export function* watchLogoutRequest() {
  yield call(takeEvery, LOGOUT_REQUEST, logoutRequest);
}
