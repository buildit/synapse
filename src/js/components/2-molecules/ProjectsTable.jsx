import React from 'react';
import RouteLink from '../1-atoms/RouteLink';
import TableCell from '../1-atoms/TableCell';
import TableHeaderCell from '../1-atoms/TableHeaderCell';

const ProjectsTable = ({ tableData, visibleColumns, rowKey }) => {
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
      <td key={`view-${projectId}`}>
        <RouteLink
          route={`${projectId}`}
          label="View"
        />
      </td>
    );

    bodyRow.push(
      <td key={`projection-${projectId}`}>
        <RouteLink
          route={`${projectId}/projection`}
          label="Projection"
        />
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

export default ProjectsTable;

ProjectsTable.propTypes = {
  tableData: React.PropTypes.array.isRequired,
  visibleColumns: React.PropTypes.array.isRequired,
  rowKey: React.PropTypes.string.isRequired,
  actionLabel: React.PropTypes.string.isRequired,
  onActionClick: React.PropTypes.func.isRequired,
};
