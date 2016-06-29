import React from 'react';
import Button from '../1-atoms/button.jsx';
import Table from '../2-molecules/table.jsx';
import { connect } from 'react-redux';

let TableWithButton = ({ dispatch, buttonText, tableData }) => {
  dispatch({ type: 'LIST_VIEW' });

  return (
    <div>
      <Button label={ buttonText } onClick={ () => {
      } } />
      <Table tableData={ tableData } />
    </div>
  );
};

TableWithButton = connect()(TableWithButton);

export default TableWithButton;

TableWithButton.propTypes = {
  buttonText: React.PropTypes.string.isRequired,
  tableData: React.PropTypes.array.isRequired,
};
