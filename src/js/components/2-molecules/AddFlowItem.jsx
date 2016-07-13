import React, { PropTypes } from 'react';
import Button from '../1-atoms/Button';

const AddFlowItem = ({ onAddClick }) => {
  let input;
  return (
    <div className="add-flow-item">
      <span>Name</span>
      <input
        ref={node => {
          input = node;
        }}
      />
      <Button
        label="Add"
        onClick={event => {
          event.preventDefault();
          onAddClick(input.value);
          input.value = '';
        }}
      />
    </div>
  );
};

export default AddFlowItem;

AddFlowItem.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};
