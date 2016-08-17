import React from 'react';

const Button = ({ label, onClick, disabled = false }) => (
  <button
    className="button btn btn-default"
    onClick={onClick}
    disabled={disabled}
  >{label}
  </button>
);

export default Button;

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
};
