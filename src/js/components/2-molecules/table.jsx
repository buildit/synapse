import React from 'react';
import TableCell from '../1-atoms/table-cell.jsx';
import TableHeaderCell from '../1-atoms/table-header-cell.jsx';

const Table = ({ tableData }) => {
  let headerRow = [];
  let bodyRows = [];
  const headerValues = Object.keys(tableData[0]);

  // for (let key in headerValues) {
  //   headerRow.push(<TableHeaderCell headerValue={key} />);
  // }

  for (let headerValue of headerValues) {
    headerRow.push(<TableHeaderCell headerValue={headerValue} />);
  }

  for (let i = 0; i < tableData.length; i++) {
    let bodyRow = [];
    for (const key of headerValues) {
      let cellValue = tableData[i][key];
      bodyRow.push(<TableCell cellValue={cellValue} />);
    }
    bodyRows.push(<tr className="tableBodyRow">{bodyRow}</tr>);
  }

  // for (let index = 1; index < tableData.length; index++) {
  //   const cellValues = tableData[index];
  //
  //   cellValues.forEach(cellValue => {
  //     bodyRows.push(<TableCell cellValue={cellValue} />);
  //   });
  // }

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
};
