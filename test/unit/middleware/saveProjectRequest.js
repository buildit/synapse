import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import Api from 'api';
import {
  setMessage,
  clearMessage,
  setErrorMessage,
  startXHR,
  endXHR,
} from 'actions';
import { SAVE_PROJECT_REQUEST } from 'actions/actions';
import { trimFormInputs } from 'helpers/trimFormInputs';
import {
  saveProjectRequest,
  watchSaveProjectRequest,
} from 'middleware/project';
const expect = require('chai').expect;

describe('Project saving', () => {
  const errorMessage = 'an error message';
  const projectName = 'a project';
  const project = { name: projectName };
  const weirdProject = { name: projectName, foo: 'bar', baz: 'narf' };
  const action = { project };
  const generator = saveProjectRequest(action);
  const weirdGenerator = saveProjectRequest({ weirdProject });
  const errorGenerator = saveProjectRequest(action);

  it('marks as xhr running', () => {
    expect(generator.next().value).to.deep.equal(put(startXHR()));
  });

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

    errorGenerator.next();
  });

  it('marks as xhr finished', () => {
    expect(generator.next().value).to.deep.equal(put(endXHR()));
  });

  it('strips out non-whitelisted fields from the project', () => {
    weirdGenerator.next();
    weirdGenerator.next();
    weirdGenerator.next(weirdProject);
    expect(weirdGenerator.next().value).to.deep.equal(call(Api.saveProject, project));
  });

  it('finishes', () => {
    expect(generator.next().done).to.equal(true);
    expect(errorGenerator.next().done).to.equal(true);
  });

  it('watches', () => {
    const watchGenerator = watchSaveProjectRequest();
    const correct = call(takeEvery, SAVE_PROJECT_REQUEST, saveProjectRequest);
    expect(watchGenerator.next().value).to.deep.equal(correct);
  });
});
