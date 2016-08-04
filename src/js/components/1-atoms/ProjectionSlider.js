import React, { PropTypes } from 'react';

const ProjectionSlider = ({ label, legendClass, onInputChange, initialValue, min, max, unit }) => {
  let input;
  return (
    <div className="projection-slider form-group">
      <span className={`legend ${legendClass}`}></span>
      <label>
        <span className="slider-label">{label}</span>
        <span className="value">{initialValue}</span>
        <span className="unit">{unit}</span>
      </label>
      <input
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
  legendClass: PropTypes.string,
  unit: PropTypes.string,
  initialValue: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
