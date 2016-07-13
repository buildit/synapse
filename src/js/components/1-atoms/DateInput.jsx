import React, { PropTypes } from 'react';
import formatDate from '../../helpers/formatDate';

const DateInput = ({ label, section, property, onInputChange, initialValue = '' }) => {
  let input;
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        className="form-control"
        type="date"
        id={`${section}${property}`}
        placeholder={label}
        ref={node => {
          input = node;
          if (input) {
            if (!input.value) {
              input.value = formatDate(initialValue);
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

export default DateInput;

DateInput.propTypes = {
  section: PropTypes.string,
  property: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  initialValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
};
