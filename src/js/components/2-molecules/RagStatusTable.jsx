import React from 'react';
import TableCell from 'components/1-atoms/TableCell';
import RAGStatusTableCell from 'components/1-atoms/RAGStatusTableCell';
import TableHeaderCell from 'components/1-atoms/TableHeaderCell';

const RagStatusTable = ({
  ragStatuses,
  visibleColumns,
}) => {
  const headerRow = [];
  const bodyRows = [];

  for (const headerValue of visibleColumns) {
    headerRow.push(
      <TableHeaderCell key={headerValue} headerValue={headerValue} />);
  }

  ragStatuses.forEach((ragStatus, i) => {
    const bodyRow = [];

    visibleColumns.forEach(key => {
      const cellValue = ragStatus[key];

      if (key === 'ragStatus') {
        bodyRow.push(<RAGStatusTableCell key={i + key} status={cellValue} />);
      } else {
        bodyRow.push(<TableCell key={i + key} cellValue={`${cellValue}`} />);
      }
    });

    bodyRows.push(
      <tr
        key={ragStatus.name}
        className="tableBodyRow"
      >{bodyRow}</tr>);
  });

  return (
    <table className="table projectsTable">
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

export default RagStatusTable;

RagStatusTable.propTypes = {
  ragStatuses: React.PropTypes.array.isRequired,
  visibleColumns: React.PropTypes.array.isRequired,
};
