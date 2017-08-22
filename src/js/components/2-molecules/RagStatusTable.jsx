import React, { Component } from 'react';
import TableCell from 'components/1-atoms/TableCell';
import RAGStatusTableCell from 'components/1-atoms/RAGStatusTableCell';
import TableHeaderCell from 'components/1-atoms/TableHeaderCell';

let currentProject = '';

class RagStatusTable extends Component {
  componentDidMount() {
    if (currentProject !== this.props.projectId) {
      currentProject = this.props.projectId;
      this.props.fetchRagStatusData(this.props.projectId);
    }
  }

  render() {
    const headerRow = [];
    const bodyRows = [];

    for (const headerValue of this.props.visibleColumns) {
      headerRow.push(
        <TableHeaderCell key={headerValue} headerValue={headerValue} />);
    }

    this.props.statuses.forEach((ragStatus, i) => {
      const bodyRow = [];

      this.props.visibleColumns.forEach(key => {
        const cellValue = ragStatus[key];
        if (key === 'status') {
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
    if (bodyRows.length) {
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
    }
    return <h5>No Data Available</h5>;
  }
}

export default RagStatusTable;

RagStatusTable.propTypes = {
  fetchRagStatusData: React.PropTypes.func.isRequired,
  projectId: React.PropTypes.string.isRequired,
  statuses: React.PropTypes.array.isRequired,
  visibleColumns: React.PropTypes.array.isRequired,
};
