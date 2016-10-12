/*
 * Middleware for FETCH_PROJECT_STATUS_DATA
 */

// import "babel-polyfill";
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

/* eslint-disable import/no-unresolved */
import { FETCH_PROJECT_STATUS_DATA } from '/actions/actions';
import { fetchStatusSuccess } from '/actions/fetchAllStatusData';
import {
  setErrorMessage,
  fetchProjectSuccess as fetchProjectSuccessAction,
} from '/actions';

import Api from '/api';
/* eslint-enable import/no-unresolved */

export function* fetchAllStatusData(action) {
  const name = action.name;
  let project = {};
  let demand = [];
  let defect = [];
  let effort = [];
  try {
    project = yield call(Api.project, name);
  } catch (err) {
    // handle err?
  }

  try {
    demand = yield call(Api.projectDemandSummary, name);
  } catch (err) {
    // handle err?
  }

  try {
    defect = yield call(Api.projectDefectSummary, name);
  } catch (err) {
    // handle err?
  }

  try {
    effort = yield call(Api.projectEffortSummary, name);
  } catch (err) {
    // handle err?
  }

  yield put(fetchStatusSuccess({
    demand,
    defect,
    effort,
  }));
  yield put(fetchProjectSuccessAction(project));
}

export function* watchFetchDemandStatusData() {
  yield* takeEvery(FETCH_PROJECT_STATUS_DATA, fetchAllStatusData);
}
