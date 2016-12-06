import { call } from 'redux-saga/effects';

import Api from 'api';

export function* fetchProject(name) {
  let project;
  try {
    project = yield call(Api.project, name);
  } catch (err) {
    project = {};
  }
  return project;
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

export function* postLoginRequest(user) {
  return yield call(Api.loginRequest, user);
}
