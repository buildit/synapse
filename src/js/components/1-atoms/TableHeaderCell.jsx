import React from 'react';

const TableHeaderCell = ({ headerValue, id }) => (
  <th className="tableHeaderCell" id={id}>{headerValue}</th>
);

export default TableHeaderCell;

TableHeaderCell.propTypes = {
  headerValue: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
};
