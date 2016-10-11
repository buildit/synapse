import { put, call } from 'redux-saga/effects';

import Api from 'api';
import { fetchProjectionRequest } from 'middleware/project';
import {
  fetchProjectSuccess,
  setMessage,
  setErrorMessage,
  setDoesNotHaveProjection,
} from 'actions';
const expect = require('chai').expect;

describe('Projection fetcher', () => {
  const project = 'test';
  const action = { name: project };
  const generator = fetchProjectionRequest(action);
  const errorGenerator = fetchProjectionRequest(action);
  const errorMessage = new Promise((response, reject) => { reject('error message'); });
  const newProjectionMessage = `You're creating a new projection for project ${action.name}.`;

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
  });

  it('marks the projection as new', () => {
    expect(errorGenerator.next().value).to.deep.equal(put(setDoesNotHaveProjection()));
  });

  it('finishes', () => {
    expect(generator.next().done).to.equal(true);
    expect(errorGenerator.next().done).to.equal(true);
  });
});
