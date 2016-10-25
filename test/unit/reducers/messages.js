import { messages as reducer, initialState } from 'reducers/messages';
import { setMessage } from 'actions';

import { expect } from 'chai';

describe('messages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(initialState);
  });

  it('should set a message', () => {
    const message = 'a message';
    const action = setMessage(message);
    expect(reducer(undefined, action)).to.equal(message);
  });
});
