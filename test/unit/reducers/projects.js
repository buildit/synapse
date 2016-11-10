import { projects as reducer, initialState } from 'reducers/projects';
import {
  receiveProjects,
  receiveStarterProjects,
} from 'actions';

import { expect } from 'chai';

describe('projects reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(initialState);
  });

  it('should update the project list', () => {
    const newProjectList = ['foo', 'bar'];
    const action = receiveProjects(newProjectList);
    const finalState = initialState;
    finalState.projectList = newProjectList;

    expect(reducer(undefined, action)).to.deep.equal(finalState);
    expect(reducer(initialState, action)).to.deep.equal(finalState);
  });

  it('should update the starter project list', () => {
    const starterProjectList = ['foo', 'bar'];
    const action = receiveStarterProjects(starterProjectList);
    const finalState = initialState;
    finalState.starterProjectList = starterProjectList;

    expect(reducer(undefined, action)).to.deep.equal(finalState);
    expect(reducer(initialState, action)).to.deep.equal(finalState);
  });
});
