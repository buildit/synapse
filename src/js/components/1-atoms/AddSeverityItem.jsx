import React, { PropTypes } from 'react';

const AddSeverityItem = ({ onAddClick }) => {
  let nameInput;
  let groupWithInput;
  return (
    <div>
      <span>Name</span>
      <input
        ref={node => {
          nameInput = node;
        }}
      />
      <span>Group With</span>
      <input
        ref={node => {
          groupWithInput = node;
        }}
      />
      <button
        onClick={event => {
          event.preventDefault();
          onAddClick(nameInput.value, groupWithInput.value);
          nameInput.value = '';
          groupWithInput.value = '';
        }}
      >Add</button>
    </div>
  );
};

export default AddSeverityItem;

AddSeverityItem.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};
