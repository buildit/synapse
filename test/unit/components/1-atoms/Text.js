import React from 'react';
import Text from 'components/1-atoms/Text';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('<Text />', () => {
  const label = 'test';
  const content = 'test 2';

  const wrapper = shallow(<Text label={label} content={content} />);

  it('puts the label text in properly', () => {
    expect(wrapper.find('.text-label').text()).to.equal(label);
  });

  it('puts the content text in properly', () => {
    expect(wrapper.find('.text-content').text()).to.equal(content);
  });
});
