import React from 'react';
import * as ragStatus from 'helpers/ragStatusConstants';

const RAGStatusTableCell = ({ status, id }) => {
  let ragClass = '';
  switch (status) {
  case ragStatus.RED: {
    ragClass = 'red';
    break;
  }
  case ragStatus.AMBER: {
    ragClass = 'amber';
    break;
  }
  case ragStatus.GREEN: {
    ragClass = 'green';
    break;
  }
  default: {
    ragClass = 'blank';
  }
  }
  return (
    <td className="rag-status-table-cell" id={id}>
      <span className={`indicator ${ragClass}`}></span>
    </td>
  );
};


export default RAGStatusTableCell;

RAGStatusTableCell.propTypes = {
  status: React.PropTypes.string,
  id: React.PropTypes.string,
};
