import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import Api from 'api';
import {
  createStatusErrorMessage,
  fetchProjectDemandData,
  fetchProjectDefectData,
  fetchProjectEffortData,
  fetchAllStatusData,
  watchFetchDemandStatusData,
} from 'middleware/status';
import { fetchProjectXhr } from 'middleware/project';
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

describe('fetcher for project demand data', () => {
  const demandCorrect = 'foo';
  const name = 'name';
  const generator = fetchProjectDemandData(name);
  const errorGenerator = fetchProjectDemandData(name);

  it('fetches demand', () => {
    const correct = call(Api.projectDemandSummary, name);
    expect(generator.next().value).to.deep.equal(correct);
    const final = generator.next(demandCorrect).value;
    expect(final).to.deep.equal(demandCorrect);
  });
  it('returns a default on failure', () => {
    errorGenerator.next();
    const final = errorGenerator.throw().value;
    expect(final).to.deep.equal([]);
  });
});

describe('fetcher for project defect data', () => {
  const defectCorrect = 'foo';
  const name = 'name';
  const generator = fetchProjectDefectData(name);
  const errorGenerator = fetchProjectDefectData(name);

  it('fetches defect', () => {
    const correct = call(Api.projectDefectSummary, name);
    expect(generator.next().value).to.deep.equal(correct);
    const final = generator.next(defectCorrect).value;
    expect(final).to.deep.equal(defectCorrect);
  });
  it('returns a default on failure', () => {
    errorGenerator.next();
    const final = errorGenerator.throw().value;
    expect(final).to.deep.equal([]);
  });
});
describe('fetcher for project effort data', () => {
  const effortCorrect = 'foo';
  const name = 'name';
  const generator = fetchProjectEffortData(name);
  const errorGenerator = fetchProjectEffortData(name);

  it('fetches effort', () => {
    const correct = call(Api.projectEffortSummary, name);
    expect(generator.next().value).to.deep.equal(correct);
    const final = generator.next(effortCorrect).value;
    expect(final).to.deep.equal(effortCorrect);
  });
  it('returns a default on failure', () => {
    errorGenerator.next();
    const final = errorGenerator.throw().value;
    expect(final).to.deep.equal([]);
  });
});


describe('All status for project fetcher', () => {
  const name = 'Foo';
  const generator = fetchAllStatusData({ name });
  const errorGenerator = fetchAllStatusData({ name });
  const demand = { this: 'that' };
  const defect = { near: 'far' };
  const effort = { we: 'they' };
  const project = { project: 'Yes, this is a project' };
  project.projection = {
    pretendKey: 'Just for the test.',
  };

  it('marks as xhr running', () => {
    expect(generator.next().value).to.deep.equal(put(startXHR()));
  });

  it('retrieves data', () => {
    const projectCorrect = call(fetchProjectXhr, name);
    const demandCorrect = call(fetchProjectDemandData, name);
    const defectCorrect = call(fetchProjectDefectData, name);
    const effortCorrect = call(fetchProjectEffortData, name);

    const correct = [
      demandCorrect,
      defectCorrect,
      effortCorrect,
      projectCorrect,
    ];
    expect(generator.next().value).to.deep.equal(correct);
  });

  it('updates the status', () => {
    const next = generator.next([demand, defect, effort, project]).value;
    const statusSuccessCorrect = put(fetchStatusSuccess({
      demand, defect, effort,
    }));
    expect(next).to.deep.equal(statusSuccessCorrect);
  });

  it('updates the project itself', () => {
    expect(generator.next().value).to.deep.equal(put(fetchProjectSuccess(project)));
  });

  it('attempts to construct an error message', () => {
    const correct = call(createStatusErrorMessage, demand, defect, effort, project);
    expect(generator.next().value).to.deep.equal(correct);
  });

  it('sends a message when there is an error message', () => {
    errorGenerator.next();
    errorGenerator.next();
    errorGenerator.next([demand, defect, effort, project]);
    errorGenerator.next();
    errorGenerator.next();
    expect(errorGenerator.next(['foo']).value).to.deep.equal(put(setMessage('foo')));
  });
  it('ends the xhr display after error', () => {
    expect(errorGenerator.next().value).to.deep.equal(put(endXHR()));
  });

  it('skips displaying an error message if there isn\'t one', () => {
    const correct = put(endXHR());
    expect(generator.next([]).value).to.deep.equal(correct);
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
