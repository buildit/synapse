import { put, call } from 'redux-saga/effects';

import Api from '../../src/js/api';
import {
  setMessage,
  clearMessage,
  onSwitchView,
  showModal,
  setErrorMessage,
} from '../../src/js/actions';
import { trimFormInputs } from '../../src/js/helpers/trimFormInputs';
import { saveProjectRequest } from '../../src/js/middleware/project';
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
  it('switches the view', () => {
    expect(generator.next().value).to.deep.equal(put(onSwitchView('modalView')));
  });
  it('shows a modal', () => {
    expect(generator.next().value).to.deep.equal(put(showModal('SaveConfirmationModal', project)));
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
