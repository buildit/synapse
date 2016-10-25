/*
 * Middleware for FETCH_PROJECT_STATUS_DATA
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { FETCH_PROJECT_STATUS_DATA } from 'actions/actions';
import {
  fetchProjectSuccess as fetchProjectSuccessAction,
  fetchStatusSuccess,
  setMessage,
  startXHR,
  endXHR,
} from 'actions';

import Api from 'api';

export function* fetchAllStatusData(action) {
  const name = action.name;
  let project = {};
  let demand = [];
  let defect = [];
  let effort = [];

  yield put(startXHR());

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

  // Show message if data is missing
  let message = '';
  const getMissingStatusDataList = (statusData) => (
    Object.keys(statusData).filter(key => (
      statusData[key].length === 0
    ))
  );
  const missingDataList = getMissingStatusDataList({ demand, defect, effort });
  const prettifiedList = missingDataList.join(', ');
  if (missingDataList.length > 0) {
    message += `There is no data for ${prettifiedList}.`;
  }
  if (!project.projection) {
    message += ' You have not yet set a projection for this project.';
  }
  if (message) {
    yield put(setMessage(message));
  }

  yield put(endXHR());
}

export function* watchFetchDemandStatusData() {
  yield call(takeEvery, FETCH_PROJECT_STATUS_DATA, fetchAllStatusData);
}
