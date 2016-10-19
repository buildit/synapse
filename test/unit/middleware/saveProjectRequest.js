import { put, call } from 'redux-saga/effects';

import Api from 'api';
import {
  setMessage,
  clearMessage,
  setErrorMessage,
} from 'actions';
import { trimFormInputs } from 'helpers/trimFormInputs';
import { saveProjectRequest } from 'middleware/project';
const expect = require('chai').expect;

describe('Project saving', () => {
  const errorMessage = 'an error message';
  const project = { name: 'a project' };
  const action = { project };
  const generator = saveProjectRequest(action);
  const errorGenerator = saveProjectRequest(action);

  it('trims the project', () => {
    expect(generator.next().value).to.deep.equal(call(trimFormInputs, project));
  });
  it('messages that it\'s saving', () => {
    expect(generator.next(project).value).to.deep.equal(put(setMessage(`Saving ${project.name}`)));
  });
  it('saves data', () => {
    expect(generator.next().value).to.deep.equal(call(Api.saveProject, project));
  });
  it('clears the message', () => {
    expect(generator.next().value).to.deep.equal(put(clearMessage()));
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
