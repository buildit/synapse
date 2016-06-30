import React from 'react';
import Button from '../1-atoms/button.jsx';
import Table from '../2-molecules/table.jsx';
import { connect } from 'react-redux';

let TableWithButton = ({ dispatch, buttonText, tableData, visibleColumns, rowKey, onProjectViewClick }) => (
  <div>
    <Button
      label={buttonText}
      onClick={() => {}}
    />
    <Table
      tableData={tableData}
      visibleColumns={visibleColumns}
      rowKey={rowKey}
      onProjectViewClick={onProjectViewClick}
    />
  </div>
);

TableWithButton = connect()(TableWithButton);

export default TableWithButton;

TableWithButton.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  buttonText: React.PropTypes.string.isRequired,
  tableData: React.PropTypes.array.isRequired,
  visibleColumns: React.PropTypes.array.isRequired,
  rowKey: React.PropTypes.string.isRequired,
};
