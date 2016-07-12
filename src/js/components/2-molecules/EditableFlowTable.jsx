import React, { Component, PropTypes } from 'react';
import EditableTableRow from '../2-molecules/EditableTableRow';

// const EditableFlowTable = ({ items, actions }) => {
class EditableFlowTable extends Component {
  render() {
    const items = this.props.items;
    const bodyRows = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      bodyRows.push(
        <EditableTableRow
          item={item}
          key={i}
          index={i}
          actions={this.props.actions}
        />
      );
    }

    return (
      <table className="table">
        <thead>
          <tr className="tableHeaderRow">
            <th className="tableHeaderCell">
              Sequence
            </th>
            <th className="tableHeaderCell">
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          {bodyRows}
        </tbody>
      </table>
    );
  }
}

export default EditableFlowTable;

EditableFlowTable.propTypes = {
  items: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
};
