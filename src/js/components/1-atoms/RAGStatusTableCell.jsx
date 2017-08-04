import React from 'react';

const RAGStatusTableCell = ({ status, id }) => {
  let ragClass = 'blank';
  if (status) {
    ragClass = status;
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
