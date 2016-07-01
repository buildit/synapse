import React from 'react';
import Button from '../1-atoms/Button.jsx';
import TableWithAction from '../2-molecules/TableWithAction.jsx';
import { connect } from 'react-redux';

let TableWithActionWithButton = ({
  buttonText, tableData, visibleColumns, rowKey, onProjectViewClick,
}) => (
  <div>
    <Button
      label={buttonText}
      onClick={() => {}}
    />
    <TableWithAction
      tableData={tableData}
      visibleColumns={visibleColumns}
      rowKey={rowKey}
      onProjectViewClick={onProjectViewClick}
    />
  </div>
);

TableWithActionWithButton = connect()(TableWithActionWithButton);

export default TableWithActionWithButton;

TableWithActionWithButton.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  buttonText: React.PropTypes.string.isRequired,
  tableData: React.PropTypes.array.isRequired,
  visibleColumns: React.PropTypes.array.isRequired,
  rowKey: React.PropTypes.string.isRequired,
  onProjectViewClick: React.PropTypes.func.isRequired,
};
