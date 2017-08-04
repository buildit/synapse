import React from 'react';
import RouteLink from 'components/1-atoms/RouteLink';
import TableCell from 'components/1-atoms/TableCell';
import RAGStatusTableCell from 'components/1-atoms/RAGStatusTableCell';
import TableHeaderCell from 'components/1-atoms/TableHeaderCell';

const ProjectsTable = ({
  tableData,
  visibleColumns,
  rowKey,
  deleteProject,
  isAuthenticated,
}) => {
  const headerRow = [];
  const bodyRows = [];

  for (const headerValue of visibleColumns) {
    // Hide description on small screens
    const classes =
      (headerValue === 'description') ? `${headerValue} hidden-sm hidden-xs` : headerValue;

    headerRow.push(
      <TableHeaderCell key={headerValue} headerValue={headerValue} classes={classes} />);
  }

  for (let i = 0; i < tableData.length; i++) {
    const projectId = tableData[i][rowKey];
    const bodyRow = [];

    for (const key of visibleColumns) {
      const cellValue = tableData[i][key];

      // Hide description on small screens
      const classes = (key === 'description') ? `${key} hidden-sm hidden-xs` : key;

      if (key === 'ragStatus') {
        bodyRow.push(<RAGStatusTableCell key={i + key} status={cellValue} />);
      } else {
        bodyRow.push(<TableCell key={i + key} cellValue={cellValue} classes={classes} />);
      }
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

    bodyRow.push(
      <td key={`status-${projectId}`}>
        <RouteLink
          route={`${projectId}/status`}
          label="Status"
        />
      </td>
    );

    if (isAuthenticated) {
      bodyRow.push(
        <td
          key={`delete-${projectId}`}
          onClick={() => deleteProject(projectId)}
        >
          <span
            className="delete-project-control fa fa-trash"
            data-project={`${projectId}`}
          ></span>
        </td>
      );
    }

    bodyRows.push(<tr
      id={tableData[i][rowKey]}
      key={tableData[i][rowKey]}
      className="tableBodyRow"
    >{bodyRow}</tr>);
  }

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

export default ProjectsTable;

ProjectsTable.propTypes = {
  tableData: React.PropTypes.array.isRequired,
  visibleColumns: React.PropTypes.array.isRequired,
  rowKey: React.PropTypes.string.isRequired,
  deleteProject: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
};
