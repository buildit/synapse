import { status as reducer, initialState } from 'reducers/status';
import { fetchStatusSuccess } from 'actions';

import { expect } from 'chai';

describe('status reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(initialState);
  });

  it('should update the status', () => {
    const newStatus = {
      demand: 'demand',
      defect: 'defect',
      effort: 'effort',
    };
    const action = fetchStatusSuccess(newStatus);

    expect(reducer(undefined, action)).to.deep.equal(newStatus);
  });
});
