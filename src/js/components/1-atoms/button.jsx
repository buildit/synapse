import React from 'react';

const Button = ({ label, onClick }) => (
  <button className="button" onClick={onClick}>{label}</button>
);

export default Button;

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};
