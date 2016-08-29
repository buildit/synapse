import React from 'react';
import Button from '../1-atoms/Button';
import TableCell from '../1-atoms/TableCell';
import TableHeaderCell from '../1-atoms/TableHeaderCell';

const TableWithAction = ({ tableData, visibleColumns, rowKey, onActionClick, actionLabel }) => {
  let headerRow = [];
  let bodyRows = [];

  for (let headerValue of visibleColumns) {
    headerRow.push(<TableHeaderCell key={headerValue} headerValue={headerValue} />);
  }

  for (let i = 0; i < tableData.length; i++) {
    let bodyRow = [];
    for (const key of visibleColumns) {
      let cellValue = tableData[i][key];
      bodyRow.push(<TableCell key={i + key} cellValue={cellValue} />);
    }
    bodyRow.push(<td key={`link-${i}`}>
      <Button
        label={actionLabel}
        onClick={() => {
          onActionClick(tableData[i][rowKey]);
        }}
      />
    </td>);
    bodyRows.push(<tr
      id={tableData[i][rowKey]}
      key={tableData[i][rowKey]}
      className="tableBodyRow"
    >{bodyRow}</tr>);
  }

  return (
    <table className="table">
      <thead>
        <tr className="tableHeaderRow">
          {headerRow}
        </tr>
      </thead>
      <tbody>
        {bodyRows}
      </tbody>
    </table>
  );
};

export default TableWithAction;

TableWithAction.propTypes = {
  tableData: React.PropTypes.array.isRequired,
  visibleColumns: React.PropTypes.array.isRequired,
  rowKey: React.PropTypes.string.isRequired,
  actionLabel: React.PropTypes.string.isRequired,
  onActionClick: React.PropTypes.func.isRequired,
};
