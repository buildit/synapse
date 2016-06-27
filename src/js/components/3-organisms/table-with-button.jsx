import React from 'react';
import Button from '../1-atoms/button.jsx';
import Table from '../2-molecules/table.jsx';

const TableWithButton = ({ buttonText, tableData }) => (
  <div>
    <Button label={buttonText} />
    <Table tableData={tableData} />
  </div>
);

export default TableWithButton;

TableWithButton.propTypes = {
  buttonText: React.PropTypes.string.isRequired,
  tableData: React.PropTypes.array.isRequired,
};
