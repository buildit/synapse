// import "babel-polyfill";
import { takeLatest, takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
  FETCH_PROJECTS,
  FETCH_PROJECTION_REQUEST,
  FETCH_PROJECTION_SUCCESS,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_STATUS_DATA,
  SAVE_PROJECTION_REQUEST,
  SET_MESSAGE,
  RESET_PROJECT,
  UPDATE_PROJECTION_ITERATION_LENGTH,
  SET_IS_NEW_PROJECT,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECTION_START_DATE,
  SET_HAS_PROJECTION,
} from '../actions/actions';
import {
  receiveProjects,
  fetchProjectionSuccess as fetchProjectionSuccessAction,
  fetchProjectSuccess as fetchProjectSuccessAction,
  updateProjectionBacklogSize,
  updateProjectionVelocityStart,
  updateProjectionVelocityMiddle,
  updateProjectionVelocityEnd,
  updateProjectionPeriodStart,
  updateProjectionPeriodEnd,
  updateProjectionDarkMatter,
  updateProjectionIterationLength,
  updateProjectionStartDate,
  setHasProjection,
  setDoesNotHaveProjection,
} from '../actions';
import { fetchStatusSuccess } from '../actions/fetchAllStatusData';

import Api from '../api';

export function* fetchProjectionRequest(action) {
  try {
    const project = Api.project(action.name);
    yield put(fetchProjectSuccessAction, project);
  }
  catch (err) {
    yield put(setMessage(`You're creating a new projection for project ${name}.`))
    yield put(setDoesNotHaveProjection())
  }
};
export function* fetchProjectionSuccess(action) {
  if (action.project.projection) {
    const projection = action.project.projection;
    yield put(updateProjectionBacklogSize(projection.backlogSize))
    yield put(updateProjectionVelocityStart(projection.startVelocity))
    yield put(updateProjectionVelocityMiddle(projection.targetVelocity))
    yield put(updateProjectionVelocityEnd(projection.endVelocity))
    yield put(updateProjectionPeriodStart(projection.startIterations))
    yield put(updateProjectionPeriodEnd(projection.endIterations))
    yield put(updateProjectionDarkMatter(projection.darkMatterPercentage))
    yield put(updateProjectionIterationLength(projection.iterationLength))
    yield put(updateProjectionStartDate(projection.startDate))
    yield put(setHasProjection())
  }
};

export function* watchFetchProjectionRequest() {
  yield * takeEvery(FETCH_PROJECTION_REQUEST, fetchProjectionRequest);
}
export function* watchFetchProjectionSuccess() {
  yield * takeEvery(FETCH_PROJECTION_SUCCESS, fetchProjectionSuccess);
}

export function* fetchAllStatusData(action) {
  const name = action.name;
  try {
    const [demand, defect, effort, project] = yield [
      Api.projectDemandSummary(name),
      Api.projectDefectSummary(name),
      Api.projectEffortSummary(name),
      Api.project(name)
    ];

    yield put(fetchStatusSuccess({
      demand,
      defect,
      effort
    }));

    yield put(fetchProjectSuccessAction(project));

  }
  catch (err) {
    // yield put(setMessage(errorHelper(err)));
  }
  finally {
    yield put({ type: 'FETCH_END' })
  }
};

export function* watchFetchAllStatusData() {
  yield* takeEvery(FETCH_PROJECT_STATUS_DATA, fetchAllStatusData);
}

export function* fetchProjects(action) {
  try {
    const projects = yield Api.projects();
    yield put(receiveProjects(projects));
  }
  catch (err) {
    // dispatch(setErrorMessage('We could not fetch the projects.'));
    // dispatch(onSwitchView('error'));

  }
};
export function* watchFetchProjects() {
  yield* takeEvery(FETCH_PROJECTS, fetchProjects);
}
