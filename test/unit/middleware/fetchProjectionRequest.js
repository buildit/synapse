import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import Api from 'api';
import {
  fetchProjectionRequest,
  watchFetchProjectionRequest,
} from 'middleware/project';
import {
  fetchProjectSuccess,
  setMessage,
  setErrorMessage,
  startXHR,
  endXHR,
} from 'actions';
import { FETCH_PROJECTION_REQUEST } from 'actions/actions';
const expect = require('chai').expect;

describe('Projection fetcher', () => {
  const project = 'test';
  const action = { name: project };
  const generator = fetchProjectionRequest(action);
  const errorGenerator = fetchProjectionRequest(action);
  const errorMessage = new Promise((response, reject) => { reject('error message'); });
  const newProjectionMessage = `You're creating a new projection for project ${action.name}.`;

  it('marks as xhr running', () => {
    expect(generator.next().value).to.deep.equal(put(startXHR()));
  });

  it('retrieves data', () => {
    expect(generator.next().value).to.deep.equal(call(Api.project, project));
  });

  it('calls a success action', () => {
    expect(generator.next(project).value).to.deep.equal(put(fetchProjectSuccess(project)));
  });

  it('sets a new projection message on error', () => {
    errorGenerator.next();

    const generatorValue = errorGenerator.throw(errorMessage).value;
    // const generatorValue = errorGenerator.throw(new Error(errorMessage)).value;
    const correct = put(setMessage(newProjectionMessage));
    expect(generatorValue).to.deep.equal(correct);
  });

  it('sets an error message on error', () => {
    expect(errorGenerator.next().value).to.deep.equal(put(setErrorMessage(errorMessage)));
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
    const watchGenerator = watchFetchProjectionRequest();
    const correct = call(takeEvery, FETCH_PROJECTION_REQUEST, fetchProjectionRequest);
    expect(watchGenerator.next().value).to.deep.equal(correct);
  });
});
