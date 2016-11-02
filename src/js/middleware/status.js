/*
 * Middleware for FETCH_PROJECT_STATUS_DATA
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { FETCH_PROJECT_STATUS_DATA } from 'actions/actions';
import {
  fetchProjectSuccess,
  fetchStatusSuccess,
  setErrorMessage,
  startXHR,
  endXHR,
} from 'actions';
import { fetchProjectXhr } from 'middleware/project';

import Api from 'api';

export function createStatusErrorMessage(demand, defect, effort, project) {
  // Construct any required error messages
  const errorMessage = [];
  const getMissingStatusDataList = (statusData) => (
    Object.keys(statusData).filter(key => (
      statusData[key].length === 0
    ))
  );
  const missingDataList = getMissingStatusDataList({ demand, defect, effort });
  if (missingDataList.length) {
    errorMessage.push(`There is no data for ${missingDataList.join(', ')}.`);
  }
  if (!project.projection) {
    errorMessage.push('You have not yet set a projection for this project.');
  }

  return errorMessage;
}

/*
 * Mini saga for retrieving demand data
 */
export function* fetchProjectDemandData(name) {
  let demand;
  try {
    demand = yield call(Api.projectDemandSummary, name);
  } catch (err) {
    demand = [];
  }

  return demand;
}

/*
 * Mini saga for retrieving defect data
 */
export function* fetchProjectDefectData(name) {
  let defect;
  try {
    defect = yield call(Api.projectDefectSummary, name);
  } catch (err) {
    defect = [];
  }
  return defect;
}

/*
 * Mini saga for retrieving effort data
 */
export function* fetchProjectEffortData(name) {
  let effort;
  try {
    effort = yield call(Api.projectEffortSummary, name);
  } catch (err) {
    effort = [];
  }
  return effort;
}

/*
 * Saga for FETCH_PROJECT_STATUS_DATA
 */
export function* fetchAllStatusData(action) {
  const name = action.name;

  yield put(startXHR());

  const [demand, defect, effort, project] = yield[
    call(fetchProjectDemandData, name),
    call(fetchProjectDefectData, name),
    call(fetchProjectEffortData, name),
    call(fetchProjectXhr, name),
  ];

  yield put(fetchStatusSuccess({
    demand,
    defect,
    effort,
  }));
  yield put(fetchProjectSuccess(project));

  const errorMessage = yield call(createStatusErrorMessage, demand, defect, effort, project);
  if (errorMessage.length) {
    yield put(setErrorMessage(errorMessage.join(' ')));
  }

  yield put(endXHR());
}

export function* watchFetchDemandStatusData() {
  yield call(takeEvery, FETCH_PROJECT_STATUS_DATA, fetchAllStatusData);
}
