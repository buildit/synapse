jest.unmock('../src/js/components/1-atoms/button');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Button = require('../src/js/components/1-atoms/button').default;

describe('Button', () => {
  it('exists', () => {
    expect(Button({
      label: 'click',
      onClick: () => {},
    })).not.toBe(null);
  });
});
