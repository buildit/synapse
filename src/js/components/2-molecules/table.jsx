import React from 'react';
import TableCell from '../1-atoms/table-cell';
import TableHeaderCell from '../1-atoms/table-header-cell';
import Link from '../1-atoms/link';

const Table = ({ tableData, visibleColumns }) => {
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
    bodyRow.push(<td>
      <Link
        label="View"
        onClick={() => {
          console.log('Clicked View.', tableData[i].id);
        }}
      />
    </td>);
    bodyRows.push(<tr key={i} className="tableBodyRow">{bodyRow}</tr>);
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

export default Table;

Table.propTypes = {
  tableData: React.PropTypes.array.isRequired,
  visibleColumns: React.PropTypes.array.isRequired,
};
