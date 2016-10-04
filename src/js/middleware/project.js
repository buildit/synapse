// import "babel-polyfill";
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

/* eslint-disable import/no-unresolved */
import {
  FETCH_PROJECTS,
  FETCH_PROJECTION_REQUEST,
  FETCH_PROJECTION_SUCCESS,
  FETCH_PROJECT_STATUS_DATA,
  SET_MESSAGE,
} from '/actions/actions';
import {
  receiveProjects,
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
} from '/actions';
import { fetchStatusSuccess } from '/actions/fetchAllStatusData';

import Api from '/api';
/* eslint-enable import/no-unresolved */

export function* fetchProjectionRequest(action) {
  try {
    const project = Api.project(action.name);
    yield put(fetchProjectSuccessAction, project);
  } catch (err) {
    yield put({
      type: SET_MESSAGE,
      message: `You're creating a new projection for project ${name}.`,
    });
    yield put(setDoesNotHaveProjection());
  }
}
export function* fetchProjectionSuccess(action) {
  if (action.project.projection) {
    const projection = action.project.projection;
    yield put(updateProjectionBacklogSize(projection.backlogSize));
    yield put(updateProjectionVelocityStart(projection.startVelocity));
    yield put(updateProjectionVelocityMiddle(projection.targetVelocity));
    yield put(updateProjectionVelocityEnd(projection.endVelocity));
    yield put(updateProjectionPeriodStart(projection.startIterations));
    yield put(updateProjectionPeriodEnd(projection.endIterations));
    yield put(updateProjectionDarkMatter(projection.darkMatterPercentage));
    yield put(updateProjectionIterationLength(projection.iterationLength));
    yield put(updateProjectionStartDate(projection.startDate));
    yield put(setHasProjection());
  }
}

export function* watchFetchProjectionRequest() {
  yield* takeEvery(FETCH_PROJECTION_REQUEST, fetchProjectionRequest);
}
export function* watchFetchProjectionSuccess() {
  yield* takeEvery(FETCH_PROJECTION_SUCCESS, fetchProjectionSuccess);
}

export function* fetchAllStatusData(action) {
  const name = action.name;
  try {
    const [demand, defect, effort, project] = yield [
      call(Api.projectDemandSummary, name),
      call(Api.projectDefectSummary, name),
      call(Api.projectEffortSummary, name),
      call(Api.project, name),
    ];

    yield put(fetchStatusSuccess({
      demand,
      defect,
      effort,
    }));

    yield put(fetchProjectSuccessAction(project));
  } catch (err) {
    yield put({ type: SET_MESSAGE, message: err });
  }
}

export function* watchFetchAllStatusData() {
  yield* takeEvery(FETCH_PROJECT_STATUS_DATA, fetchAllStatusData);
}

export function* fetchProjects() {
  try {
    const projects = yield call(Api.projects);
    yield put(receiveProjects(projects));
  } catch (err) {
    yield put({ type: SET_MESSAGE, message: err });
  }
}
export function* watchFetchProjects() {
  yield* takeEvery(FETCH_PROJECTS, fetchProjects);
}
