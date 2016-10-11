import { put, call } from 'redux-saga/effects';

import Api from 'api';
import { fetchAllStatusData } from 'middleware/status';
import {
  fetchProjectSuccess,
  setErrorMessage,
} from 'actions';
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
  const errorGenerator = fetchAllStatusData({ name });
  const errorMessage = 'foo';

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

  it('handles exceptions properly', () => {
    // Step to the first yield, so that we're inside the error catcher.
    errorGenerator.next();

    const message = put(setErrorMessage(errorMessage));
    expect(errorGenerator.throw(errorMessage).value).to.deep.equal(message);
  });

  it('finishes', () => {
    expect(generator.next().done).to.equal(true);
    expect(errorGenerator.next().done).to.equal(true);
  });
});
