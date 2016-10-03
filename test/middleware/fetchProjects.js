import Api from '../../src/js/api';
import * as actions from '../../src/js/actions/actions';
import { fetchProjects } from '../../src/js/middleware/project';
const expect = require('chai').expect;

describe('All projects fetcher', () => {
  const generator = fetchProjects();

  it('retrieves data', () => {
    const xhrCorrect = {
      '@@redux-saga/IO': true,
      CALL: { context: null, fn: Api.projects, args: [] },
    };
    expect(generator.next().value).to.deep.equal(xhrCorrect);
  });

  it('issues an action', () => {
    const actionCorrect = {
      '@@redux-saga/IO': true,
      PUT: {
        channel: null,
        action: { type: actions.FETCH_PROJECTS_RECEIVE, response: undefined },
      },
    };
    expect(generator.next().value).to.deep.equal(actionCorrect);
  });
});
