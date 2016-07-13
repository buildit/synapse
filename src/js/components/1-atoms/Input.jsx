import React, { PropTypes } from 'react';
// import moment from 'moment';

const Input = ({ label, section, property, onInputChange, initialValue = '' }) => {
  let input;
  return (
    <div className="form-group">
      <label htmlFor={`${section}${property}`}>{label}</label>
      <input
        className="form-control"
        type="text"
        id={`${section}${property}`}
        placeholder={label}
        ref={node => {
          input = node;
          if (input) {
            if (!input.value) {
              input.value = initialValue;
            }
          }
        }
      }
        onChange={() => {
          onInputChange(section, property, input.value);
        }
      }
      />
    </div>
    );
};

export default Input;

Input.propTypes = {
  section: PropTypes.string,
  property: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  initialValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
};