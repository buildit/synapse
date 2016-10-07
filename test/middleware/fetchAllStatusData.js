import { put, call } from 'redux-saga/effects';

import Api from '../../src/js/api';
import { fetchAllStatusData } from '../../src/js/middleware/project';
import {
  fetchProjectSuccess,
  setErrorMessage,
} from '../../src/js/actions';
import {
  fetchStatusSuccess,
} from '../../src/js/actions/fetchAllStatusData';
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
    const xhrCorrect = [
      call(Api.projectDemandSummary, name),
      call(Api.projectDefectSummary, name),
      call(Api.projectEffortSummary, name),
      call(Api.project, name),
    ];

    expect(generator.next().value).to.deep.equal(xhrCorrect);
  });

  it('updates the status', () => {
    const statusSuccessCorrect = put(fetchStatusSuccess({
      demand, defect, effort,
    }));
    const next = generator.next([demand, defect, effort, project]).value;
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
