import React from 'react';

const Button = ({ label, cssClasses, onClick, disabled = false }) => (
  <button
    className={cssClasses}
    onClick={onClick}
    disabled={disabled}
  >{label}
  </button>
);

export default Button;

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  cssClasses: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
};
