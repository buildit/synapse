import React, { PropTypes } from 'react';

const ProjectionSlider = ({ label, legendClass, onInputChange, initialValue, min, max }) => {
  let input;
  return (
    <div className="form-group">
      <span className={`legend ${legendClass}`}></span>
      <label
      >{label}: <span>{initialValue}</span></label>
      <input
        className="form-control"
        type="range"
        min={min}
        max={max}
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

export default ProjectionSlider;

ProjectionSlider.propTypes = {
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
