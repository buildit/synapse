import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
  FETCH_PROJECTS,
  FETCH_PROJECTION_REQUEST,
  FETCH_PROJECTION_SUCCESS,
  FETCH_STARTER_PROJECTS_REQUEST,
  FETCH_PROJECT_REQUEST,
  SAVE_PROJECTION_REQUEST,
  UPDATE_PROJECT_REQUEST,
  SAVE_PROJECT_REQUEST,
} from 'actions/actions';
import {
  receiveProjects,
  receiveStarterProjects,
  fetchProjectSuccess as fetchProjectSuccessAction,
  fetchProjectionSuccess as fetchProjectionSuccessAction,
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
  showModal,
  switchLocation,
  setMessage,
  clearMessage,
  setErrorMessage,
  onSwitchView,
} from 'actions';
import { trimFormInputs } from 'helpers/trimFormInputs';

import Api from 'api';

/*
 * Middleware for FETCH_PROJECTION_REQUEST
 */
export function* fetchProjectionRequest(action) {
  try {
    const project = yield call(Api.project, action.name);
    yield put(fetchProjectSuccessAction(project));
  } catch (err) {
    yield put(setMessage(`You're creating a new projection for project ${action.name}.`));
    yield put(setErrorMessage(err));
    yield put(setDoesNotHaveProjection());
  }
}
export function* watchFetchProjectionRequest() {
  yield* takeEvery(FETCH_PROJECTION_REQUEST, fetchProjectionRequest);
}

/*
 * Middleware for FETCH_PROJECTION_SUCCESS
 * needs test
 */
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
  } else {
    yield put(setErrorMessage('We could not fetch the project.'));
  }
}
export function* watchFetchProjectionSuccess() {
  yield* takeEvery(FETCH_PROJECTION_SUCCESS, fetchProjectionSuccess);
}


/*
 * Middleware for FETCH_PROJECT_REQUEST
 * needs test
 */
export function* fetchProjectRequest(action) {
  try {
    const project = yield call(Api.project, action.name);
    yield put(fetchProjectSuccessAction(project));
    yield put(fetchProjectionSuccessAction(project));
  } catch (err) {
    yield put(setErrorMessage('We could not fetch the project.'));
  }
}
export function* watchFetchProjectRequest() {
  yield* takeEvery(FETCH_PROJECT_REQUEST, fetchProjectRequest);
}


/*
 * Middleware for FETCH_PROJECTS
 */
export function* fetchProjects() {
  try {
    const projects = yield call(Api.projects);
    yield put(receiveProjects(projects));
  } catch (err) {
    yield put(setErrorMessage(err));
  }
}
export function* watchFetchProjects() {
  yield* takeEvery(FETCH_PROJECTS, fetchProjects);
}


/*
 * Middleware for FETCH_STARTER_PROJECTS_REQUEST
 */
export function* fetchStarterProjects() {
  try {
    const starterProjects = yield call(Api.starterProjects);
    yield put(receiveStarterProjects(starterProjects));
  } catch (err) {
    yield put(setErrorMessage(err));
    yield put(switchLocation('error'));
  }
}
export function* watchFetchStarterProjectsRequest() {
  yield* takeEvery(FETCH_STARTER_PROJECTS_REQUEST, fetchStarterProjects);
}


/*
 * Middleware for SAVE_PROJECTION_REQUEST
 */
export function* saveProjectionRequest(action) {
  try {
    const projection = action.projection;
    const name = action.name;
    const projectionToSave = {
      backlogSize: projection.backlogSize,
      darkMatterPercentage: projection.darkMatter,
      iterationLength: projection.iterationLength,
      startVelocity: projection.velocityStart,
      targetVelocity: projection.velocityMiddle,
      startIterations: projection.periodStart,
      endIterations: projection.periodEnd,
      endVelocity: projection.velocityEnd,
      startDate: projection.startDate,
    };
    yield call(Api.saveProjection, projectionToSave, name);
    yield put(setMessage(`The projection for project ${name} was saved successfully.`));
  } catch (err) {
    yield put(setErrorMessage(`There was an error. We could not save the projection: ${err}`));
  }
}
export function* watchSaveProjectionRequest() {
  yield* takeEvery(SAVE_PROJECTION_REQUEST, saveProjectionRequest);
}


/*
 * Middleware for UPDATE_PROJECT_REQUEST
 */
export function* updateProjectRequest(action) {
  try {
    yield call(Api.updateProject, action.project);
    const message = `The form data for project ${action.project.name} was saved successfully.`;
    yield put(setMessage(message));
  } catch (err) {
    yield put(setErrorMessage(`There was an error.  We could not save the project: ${err}`));
  }
}
export function* watchUpdateProjectRequest() {
  yield* takeEvery(UPDATE_PROJECT_REQUEST, updateProjectRequest);
}


/*
 * Middleware for SAVE_PROJECT_REQUEST
 */
export function* saveProjectRequest(action) {
  try {
    const project = yield(call(trimFormInputs, action.project));
    yield put(setMessage(`Saving ${project.name}`));
    yield call(Api.saveProject, project);
    yield put(onSwitchView('modalView'));
    yield put(showModal('SaveConfirmationModal', project));
    yield put(clearMessage());
  } catch (err) {
    yield put(setErrorMessage(err));
  }
}
export function* watchSaveProjectRequest() {
  yield* takeEvery(SAVE_PROJECT_REQUEST, saveProjectRequest);
}
