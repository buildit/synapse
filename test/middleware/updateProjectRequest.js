import { put, call } from 'redux-saga/effects';

import Api from '../../src/js/api';
import {
  setMessage,
  setErrorMessage,
} from '../../src/js/actions';
import { updateProjectRequest } from '../../src/js/middleware/project';
const expect = require('chai').expect;

describe('Project updating', () => {
  const error = 'an error';
  const errorMessage = `There was an error.  We could not save the project: ${error}`;
  const project = { name: 'a project' };
  const action = { project };
  const generator = updateProjectRequest(action);
  const errorGenerator = updateProjectRequest(action);

  it('saves data', () => {
    expect(generator.next().value).to.deep.equal(call(Api.updateProject, project));
  });

  it('messages that the project was updated', () => {
    const correct = `The form data for project ${project.name} was saved successfully.`;
    expect(generator.next().value).to.deep.equal(put(setMessage(correct)));
  });

  it('displays an error message', () => {
    errorGenerator.next();

    expect(errorGenerator.throw(error).value).to.deep.equal(put(setErrorMessage(errorMessage)));
  });

  it('finishes', () => {
    expect(generator.next().done).to.equal(true);
    expect(errorGenerator.next().done).to.equal(true);
  });
});
