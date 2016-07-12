import React, { PropTypes } from 'react';
import EditableRoleTableRow from '../2-molecules/EditableRoleTableRow';

const EditableRoleTable = ({ items, actions }) => {
  const bodyRows = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    bodyRows.push(
      <EditableRoleTableRow
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
            Name
          </th>
          <th className="tableHeaderCell">
            Group With
          </th>
        </tr>
      </thead>
      <tbody>
        {bodyRows}
      </tbody>
    </table>
  );
};

export default EditableRoleTable;

EditableRoleTable.propTypes = {
  items: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
};
