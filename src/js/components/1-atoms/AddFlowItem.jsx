import React, { PropTypes } from 'react';

const AddFlowItem = ({ onAddClick }) => {
  let input;
  return (
    <div>
      <span>Name</span>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={event => {
          event.preventDefault();
          onAddClick(input.value);
          input.value = '';
        }}
      >Add</button>
    </div>
  );
};

export default AddFlowItem;

AddFlowItem.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};
