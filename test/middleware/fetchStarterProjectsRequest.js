import { put, call } from 'redux-saga/effects';

import Api from '../../src/js/api';
import {
  receiveStarterProjects,
  setErrorMessage,
} from '../../src/js/actions';
import { fetchStarterProjects } from '../../src/js/middleware/project';
const expect = require('chai').expect;

describe('Starter projects fetcher', () => {
  const errorMessage = 'an error message';
  const starterProjects = 'a project';
  const generator = fetchStarterProjects();
  const errorGenerator = fetchStarterProjects();

  it('retrieves data', () => {
    expect(generator.next().value).to.deep.equal(call(Api.starterProjects));
  });

  it('handles data retrieved', () => {
    const starters = put(receiveStarterProjects(starterProjects));
    expect(generator.next(starterProjects).value).to.deep.equal(starters);
  });

  it('displays an error message', () => {
    errorGenerator.next();

    const message = put(setErrorMessage(errorMessage));
    expect(errorGenerator.throw(errorMessage).value).to.deep.equal(message);
  });
  // TODO: fix this test
  // it('switches location', () => {
  //   expect(errorGenerator.next().value).to.deep.equal(put(switchLocation('error')));
  // });

  // TODO: re-enable this when the previous test is fixed
  // it('finishes', () => {
  //   expect(generator.next().done).to.equal(true);
  //   expect(errorGenerator.next().done).to.equal(true);
  // });
});
