import React from 'react';

const TableHeaderCell = ({ headerValue }) => (
  <th className="tableHeaderCell">{headerValue}</th>
);

export default TableHeaderCell;

TableHeaderCell.propTypes = {
  headerValue: React.PropTypes.string.isRequired,
};
