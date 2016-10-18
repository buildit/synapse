import { put, call } from 'redux-saga/effects';

import Api from 'api';
import {
  receiveProjects,
  setErrorMessage,
} from 'actions';
import { fetchProjects } from 'middleware/project';
const expect = require('chai').expect;

describe('All projects fetcher', () => {
  const errorMessage = 'an error message';
  const projects = 'a project';
  const generator = fetchProjects();
  const errorGenerator = fetchProjects();

  it('retrieves data', () => {
    expect(generator.next().value).to.deep.equal(call(Api.projects));
  });

  it('issues an action', () => {
    expect(generator.next(projects).value).to.deep.equal(put(receiveProjects(projects)));
  });

  it('displays an error message', () => {
    errorGenerator.next();

    const message = put(setErrorMessage(errorMessage));
    expect(errorGenerator.throw(errorMessage).value).to.deep.equal(message);
  });

  it('finishes', () => {
    expect(generator.next().done).to.equal(true);
    expect(errorGenerator.next().done).to.equal(true);
  });
});
