import React, { PropTypes } from 'react';
import Button from '../1-atoms/Button';

const AddRoleItem = ({ onAddClick }) => {
  let nameInput;
  let groupWithInput;
  return (
    <div className="add-role-item">
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
      <Button
        label="Add"
        onClick={event => {
          event.preventDefault();
          onAddClick(nameInput.value, groupWithInput.value);
          nameInput.value = '';
          groupWithInput.value = '';
        }}
      />
    </div>
  );
};

export default AddRoleItem;

AddRoleItem.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};
