import React from 'react';

const TableCell = ({ cellValue }) => (
  <td className="tableCell">{cellValue}</td>
);

export default TableCell;

TableCell.propTypes = {
  cellValue: React.PropTypes.string,
};
