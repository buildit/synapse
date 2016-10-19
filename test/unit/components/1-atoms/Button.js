import React from 'react';
import Button from 'components/1-atoms/Button';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import { expect } from 'chai';

// const Button = ({ label, cssClasses, onClick, disabled = false }) => (
//   <button
//     className={cssClasses}
//     onClick={onClick}
//     disabled={disabled}
//   >{label}
//   </button>
// );

describe('<Button />', () => {
  const label = 'test';
  const onClick = () => { return true; };
  const className = 'foo';
  const disabled = true;

  const wrapper = shallow(<Button label={label} cssClasses={className} onClick={onClick} disabled={disabled} />);

  it('puts the label text in properly', () => {
    expect(wrapper.text()).to.equal(label);
  });

  it('sets the class properly', () => {
    expect(wrapper.hasClass(className)).to.equal(true);
  });

  it('sets the click handler properly', () => {
    expect(wrapper.prop('onClick')).to.equal(onClick);
  });

  it('sets itself disabled properly', () => {
    expect(wrapper.prop('disabled')).to.equal(disabled);
  });
});
