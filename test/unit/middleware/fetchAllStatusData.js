import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import Api from 'api';
import {
  fetchAllStatusData,
  watchFetchDemandStatusData,
} from 'middleware/status';
import {
  fetchProjectSuccess,
  setMessage,
  startXHR,
  endXHR,
} from 'actions';
import { FETCH_PROJECT_STATUS_DATA } from 'actions/actions';
import {
  fetchStatusSuccess,
} from 'actions/fetchAllStatusData';
const expect = require('chai').expect;

describe('All status for project fetcher', () => {
  const name = 'Foo';
  const generator = fetchAllStatusData({ name });
  const demand = { this: 'that' };
  const defect = { near: 'far' };
  const effort = { we: 'they' };
  const project = { project: 'Yes, this is a project' };
  project.projection = {
    pretendKey: 'Just for the test.',
  };
  const errorGenerator = fetchAllStatusData({ name });

  it('marks as xhr running', () => {
    expect(generator.next().value).to.deep.equal(put(startXHR()));
  });

  it('retrieves data', () => {
    const projectCorrect = call(Api.project, name);
    const demandCorrect = call(Api.projectDemandSummary, name);
    const defectCorrect = call(Api.projectDefectSummary, name);
    const effortCorrect = call(Api.projectEffortSummary, name);

    expect(generator.next().value).to.deep.equal(projectCorrect);
    expect(generator.next(project).value).to.deep.equal(demandCorrect);
    expect(generator.next(demand).value).to.deep.equal(defectCorrect);
    expect(generator.next(defect).value).to.deep.equal(effortCorrect);
  });

  it('updates the status', () => {
    const statusSuccessCorrect = put(fetchStatusSuccess({
      demand, defect, effort,
    }));
    const next = generator.next(effort).value;
    expect(next).to.deep.equal(statusSuccessCorrect);
  });

  it('updates the project itself', () => {
    expect(generator.next().value).to.deep.equal(put(fetchProjectSuccess(project)));
  });

  it('handles missing data properly', () => {
    // TODO: add a second thing in here that handles not having a projection (line 72 is uncovered)
    /* eslint-disable no-unused-expressions */
    errorGenerator.next();
    errorGenerator.next().value;
    errorGenerator.next(project).value;
    errorGenerator.next(demand).value;
    errorGenerator.next(defect).value;

    errorGenerator.next([]);
    errorGenerator.next();
    /* eslint-enable no-unused-expressions */


    const messageCorrect = put(setMessage('There is no data for effort.'));
    expect(errorGenerator.next([]).value).to.deep.equal(messageCorrect);

    errorGenerator.next();
  });

  it('marks as xhr finished', () => {
    expect(generator.next().value).to.deep.equal(put(endXHR()));
  });

  it('finishes', () => {
    expect(generator.next().done).to.equal(true);
    expect(errorGenerator.next().done).to.equal(true);
  });

  it('watches', () => {
    const watchGenerator = watchFetchDemandStatusData();
    const correct = call(takeEvery, FETCH_PROJECT_STATUS_DATA, fetchAllStatusData);
    expect(watchGenerator.next().value).to.deep.equal(correct);
  });
});
