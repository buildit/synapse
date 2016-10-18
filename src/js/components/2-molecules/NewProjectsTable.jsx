import React from 'react';
import TableCell from 'components/1-atoms/TableCell';
import TableHeaderCell from 'components/1-atoms/TableHeaderCell';

const NewProjectsTable = ({ tableData, visibleColumns, rowKey, onProjectCreateClick }) => {
  let headerRow = [];
  let bodyRows = [];

  for (let headerValue of visibleColumns) {
    headerRow.push(<TableHeaderCell key={headerValue} headerValue={headerValue} />);
  }

  for (let i = 0; i < tableData.length; i++) {
    const projectId = tableData[i][rowKey];
    let bodyRow = [];

    for (const key of visibleColumns) {
      let cellValue = tableData[i][key];
      bodyRow.push(<TableCell key={i + key} cellValue={cellValue} />);
    }

    bodyRow.push(
      <td key={`create-${projectId}`}>
        <span
          onClick={() => {
            onProjectCreateClick(projectId);
          }}
        >
          Create
        </span>
      </td>
    );

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

export default NewProjectsTable;

NewProjectsTable.propTypes = {
  tableData: React.PropTypes.array.isRequired,
  visibleColumns: React.PropTypes.array.isRequired,
  rowKey: React.PropTypes.string.isRequired,
  onProjectCreateClick: React.PropTypes.func.isRequired,
};
