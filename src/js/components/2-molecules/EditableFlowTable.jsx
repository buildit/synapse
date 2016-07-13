import React, { PropTypes } from 'react';
import EditableFlowTableRow from '../2-molecules/EditableFlowTableRow';

const EditableFlowTable = ({ items, removeItem, moveItemUp, moveItemDown }) => {
  const bodyRows = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    bodyRows.push(
      <EditableFlowTableRow
        item={item}
        key={i}
        index={i}
        itemsSize={items.length}
        removeItem={removeItem}
        moveItemUp={moveItemUp}
        moveItemDown={moveItemDown}
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
  removeItem: PropTypes.func.isRequired,
  moveItemUp: PropTypes.func.isRequired,
  moveItemDown: PropTypes.func.isRequired,
};
