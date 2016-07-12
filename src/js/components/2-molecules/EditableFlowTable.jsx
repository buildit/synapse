import React, { PropTypes } from 'react';
import EditableFlowTableRow from '../2-molecules/EditableFlowTableRow';

const EditableFlowTable = ({ items, actions }) => {
  const bodyRows = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    bodyRows.push(
      <EditableFlowTableRow
        item={item}
        key={i}
        index={i}
        actions={actions}
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
};

export default EditableFlowTable;

EditableFlowTable.propTypes = {
  items: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
};
