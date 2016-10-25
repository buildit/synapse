import { xhr as reducer, initialState } from 'reducers/xhr';
import {
  startXHR,
  endXHR,
} from 'actions';

import { expect } from 'chai';

describe('xhr reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(initialState);
  });

  it('should mark xhr as started', () => {
    expect(reducer(undefined, startXHR())).to.equal(true);
  });

  it('should mark xhr as completed', () => {
    expect(reducer(undefined, endXHR())).to.equal(false);
  });
});
