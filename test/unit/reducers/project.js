import { project as reducer, initialState } from 'reducers/project';
import {
  updateProjection,
  fetchProjectSuccess,
  resetProject,
} from 'actions';

import { expect } from 'chai';

describe('project reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(initialState);
  });

  it('should update the projection', () => {
    const newProjection = 'a projection';
    const action = updateProjection(newProjection);
    const finalState = initialState;
    finalState.projection = newProjection;

    expect(reducer(undefined, action)).to.deep.equal(finalState);
  });

  it('should update a whole project', () => {
    const newProject = { name: 'foo' };
    const action = fetchProjectSuccess(newProject);

    expect(reducer(undefined, action)).to.deep.equal(newProject);
  });

  it('should update a whole project when it\'s not new', () => {
    const newProject = { name: 'foo', new: false };
    const action = fetchProjectSuccess(newProject);

    expect(reducer(undefined, action)).to.deep.equal(newProject);
  });

  it('should reset a project', () => {
    const oldProject = { name: 'foo' };
    const action = resetProject();

    expect(reducer(oldProject, action)).to.deep.equal(initialState);
  });

  // TODO: initialize_new_project, once we get that straightened out
});
