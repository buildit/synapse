import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import getRagStatus from 'helpers/getRagStatus';

import {
  FETCH_PROJECTS,
  FETCH_PROJECTION_REQUEST,
  FETCH_STARTER_PROJECTS_REQUEST,
  FETCH_PROJECT_REQUEST,
  SAVE_PROJECTION_REQUEST,
  UPDATE_PROJECT_REQUEST,
  SAVE_PROJECT_REQUEST,
} from 'actions/actions';
import {
  receiveProjects,
  receiveStarterProjects,
  fetchProjectSuccess,
  setMessage,
  clearMessage,
  setErrorMessage,
  startXHR,
  endXHR,
} from 'actions';
import { trimFormInputs } from 'helpers/trimFormInputs';
import {
  fetchProject,
  fetchProjectDemandData,
} from 'middleware/api';

import Api from 'api';

/*
 * Middleware for FETCH_PROJECT_REQUEST
 */
export function* fetchProjectRequest(action) {
  try {
    yield put(startXHR());
    const project = yield call(fetchProject, action.name);
    yield put(fetchProjectSuccess(project));
  } catch (err) {
    yield put(setErrorMessage('We could not fetch the project.'));
  } finally {
    yield put(endXHR());
  }
}
export function* watchFetchProjectRequest() {
  yield call(takeEvery, FETCH_PROJECT_REQUEST, fetchProjectRequest);
}
export function* watchFetchProjectionRequest() {
  yield call(takeEvery, FETCH_PROJECTION_REQUEST, fetchProjectRequest);
}

/*
 * Middleware for FETCH_PROJECTS
 */
export function* fetchProjects() {
  let projectSummary = [];
  try {
    yield put(startXHR());
    projectSummary = yield call(Api.projects);
    const length = projectSummary.length;
    for (let i = 0; i < length; i++) {
      const name = projectSummary[i].name;
      const project = yield call(fetchProject, name);
      try {
        const demand = yield call(fetchProjectDemandData, name);
        projectSummary[i].status = yield call(getRagStatus, project.projection, demand);
      } catch (err) {
        yield put(setErrorMessage(err));
      }
    }
    yield put(receiveProjects(projectSummary));
  } catch (err) {
    yield put(setErrorMessage(err));
  } finally {
    yield put(endXHR());
  }
}
export function* watchFetchProjects() {
  yield call(takeEvery, FETCH_PROJECTS, fetchProjects);
}


/*
 * Middleware for FETCH_STARTER_PROJECTS_REQUEST
 */
export function* fetchStarterProjects() {
  try {
    yield put(startXHR());
    const starterProjects = yield call(Api.starterProjects);
    yield put(receiveStarterProjects(starterProjects));
  } catch (err) {
    yield put(setErrorMessage(err));
  } finally {
    yield put(endXHR());
  }
}
export function* watchFetchStarterProjectsRequest() {
  yield call(takeEvery, FETCH_STARTER_PROJECTS_REQUEST, fetchStarterProjects);
}


/*
 * Middleware for SAVE_PROJECTION_REQUEST
 */
export function* saveProjectionRequest(action) {
  try {
    yield put(startXHR());
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
      // endDate: projection.endDate,
    };
    yield call(Api.saveProjection, projectionToSave, name);
    yield put(setMessage(`The projection for project ${name} was saved successfully.`));
  } catch (err) {
    yield put(setErrorMessage(`There was an error. We could not save the projection: ${err}`));
  } finally {
    yield put(endXHR());
  }
}
export function* watchSaveProjectionRequest() {
  yield call(takeEvery, SAVE_PROJECTION_REQUEST, saveProjectionRequest);
}


/*
 * Middleware for UPDATE_PROJECT_REQUEST
 */
export function* updateProjectRequest(action) {
  try {
    yield put(startXHR());
    yield call(Api.updateProject, action.project);
    const message = `The form data for project ${action.project.name} was saved successfully.`;
    yield put(setMessage(message));
  } catch (err) {
    yield put(setErrorMessage(`There was an error.  We could not save the project: ${err}`));
  } finally {
    yield put(endXHR());
  }
}
export function* watchUpdateProjectRequest() {
  yield call(takeEvery, UPDATE_PROJECT_REQUEST, updateProjectRequest);
}


/*
 * Middleware for SAVE_PROJECT_REQUEST
 */
export function* saveProjectRequest(action) {
  try {
    yield put(startXHR());
    const project = yield(call(trimFormInputs, action.project));
    yield put(setMessage(`Saving ${project.name}`));
    yield call(Api.saveProject, project);
    yield put(clearMessage());
  } catch (err) {
    yield put(setErrorMessage(err));
  } finally {
    yield put(endXHR());
  }
}
export function* watchSaveProjectRequest() {
  yield call(takeEvery, SAVE_PROJECT_REQUEST, saveProjectRequest);
}
