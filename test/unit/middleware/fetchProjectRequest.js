import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import Api from 'api';
import {
  fetchProjectRequest,
  watchFetchProjectRequest,
} from 'middleware/project';
import {
  fetchProjectSuccess,
  setMessage,
  startXHR,
  endXHR,
} from 'actions';
import { FETCH_PROJECT_REQUEST } from 'actions/actions';
const expect = require('chai').expect;

describe('Single project fetcher', () => {
  const project = 'test';
  const action = { name: project };
  const generator = fetchProjectRequest(action);
  const errorGenerator = fetchProjectRequest(action);
  const errorMessage = new Promise((response, reject) => { reject('error message'); });
  const displayedErrorMessage = 'We could not fetch the project.';

  it('marks as xhr running', () => {
    expect(generator.next().value).to.deep.equal(put(startXHR()));
  });

  it('retrieves data', () => {
    expect(generator.next().value).to.deep.equal(call(Api.project, project));
  });

  it('calls a success action', () => {
    expect(generator.next(project).value).to.deep.equal(put(fetchProjectSuccess(project)));
  });

  it('sets a message on error', () => {
    errorGenerator.next();

    const generatorValue = errorGenerator.throw(errorMessage).value;
    const correct = put(setMessage(displayedErrorMessage));
    expect(generatorValue).to.deep.equal(correct);

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
    const watchGenerator = watchFetchProjectRequest();
    const correct = call(takeEvery, FETCH_PROJECT_REQUEST, fetchProjectRequest);
    expect(watchGenerator.next().value).to.deep.equal(correct);
  });
});
