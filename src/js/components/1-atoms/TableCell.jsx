import React from 'react';

const TableCell = ({ cellValue, id }) => (
  <td className="tableCell" id={id}>{cellValue}</td>
);

export default TableCell;

TableCell.propTypes = {
  cellValue: React.PropTypes.string,
};
