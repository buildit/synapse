import { put, call } from 'redux-saga/effects';

import Api from 'api';
import {
  receiveProjects,
  setErrorMessage,
} from 'actions';
import { fetchProjects } from 'middleware/project';
import getRagStatus from 'helpers/getRagStatus';
const expect = require('chai').expect;

describe('All projects fetcher', () => {
  const errorMessage = 'an error message';
  const project1 = { name: 'P001', projection: {} };
  const projects = [project1];
  const demand = [];
  const generator = fetchProjects();
  const errorGenerator = fetchProjects();

  it('retrieves project summary data', () => {
    expect(generator.next().value).to.deep.equal(call(Api.projects));
  });

  it('retrieves individual project data for each project', () => {
    expect(generator.next(projects).value).to.deep.equal(call(Api.project, project1.name));
  });

  it('retrieves demand status data for each project', () => {
    expect(
      generator.next(project1).value).to.deep.equal(call(Api.projectDemandSummary, project1.name));
  });

  it('calculates the rag status for each project', () => {
    expect(
      generator.next(demand).value).to.deep.equal(call(getRagStatus, project1.projection, demand));
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
