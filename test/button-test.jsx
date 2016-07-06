jest.unmock('../src/js/components/1-atoms/Button');

import React from 'react';
import { shallow } from 'enzyme';
import Button from '../src/js/components/1-atoms/Button';

describe('Button', () => {
  it('ouputs a <button> with passed label', () => {
    const label = 'hi';
    const wrapper = shallow(<Button label={label} onClick={() => {}} />);
    expect(wrapper.name()).toEqual('button');
    expect(wrapper.text()).toEqual(label);
  });
});
