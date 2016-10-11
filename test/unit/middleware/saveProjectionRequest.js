import { put, call } from 'redux-saga/effects';

import Api from 'api';
import {
  setMessage,
} from 'actions';
import { saveProjectionRequest } from 'middleware/project';
const expect = require('chai').expect;

describe('Project saver', () => {
  // Neither of these work properly
  // const errorMessage = { message: 'an error message' };
  // const errorMessage = 'an error message';
  const projection = {
    backlogSize: true,
    darkMatter: true,
    iterationLength: true,
    velocityStart: true,
    velocityMiddle: true,
    periodStart: true,
    periodEnd: true,
    velocityEnd: true,
    startDate: true,
  };
  const processedProjection = {
    backlogSize: true,
    darkMatterPercentage: true,
    iterationLength: true,
    startVelocity: true,
    targetVelocity: true,
    startIterations: true,
    endIterations: true,
    endVelocity: true,
    startDate: true,
  };
  const name = 'a name';
  const action = { projection, name };
  const generator = saveProjectionRequest(action);
  // const errorGenerator = saveProjectionRequest();

  it('saves data', () => {
    const correctSave = call(Api.saveProjection, processedProjection, name);
    expect(generator.next().value).to.deep.equal(correctSave);
  });

  it('displays a message', () => {
    const message = put(setMessage(`The projection for project ${name} was saved successfully.`));
    expect(generator.next().value).to.deep.equal(message);
  });

  // TODO:  Figure out why this test is borked.
  // it('displays an error message', () => {
  //   errorGenerator.next();
  //
  //   const message = `There was an error. We could not save the projection: ${errorMessage}`;
  //   expect(errorGenerator.throw(errorMessage).value)
  //      .to.deep.equal(put(setErrorMessage(message)));
  // });

  // TODO: re-enable this test once the previous test is fixed
  // it('finishes', () => {
  //   expect(generator.next().done).to.equal(true);
  //   expect(errorGenerator.next().done).to.equal(true);
  // });
});
