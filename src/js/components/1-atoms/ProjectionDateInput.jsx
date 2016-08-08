import React, { PropTypes } from 'react';

const ProjectionDateInput = ({ label, onInputChange, initialValue = '' }) => {
  let input;
  return (
    <div className="projection-date-input">
      <label>{label}</label>
      <input
        type="date"
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
          onInputChange(input.value);
        }
      }
      />
    </div>
    );
};

export default ProjectionDateInput;

ProjectionDateInput.propTypes = {
  section: PropTypes.string,
  property: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  initialValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
};
