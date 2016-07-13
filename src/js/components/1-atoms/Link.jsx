import React from 'react';

const Link = ({ label, onClick, id }) => (
  <a
    className="link"
    onClick={(event) => {
      event.preventDefault();
      onClick();
    }}
    id={id}
  >{label}
  </a>
);

export default Link;

Link.propTypes = {
  label: React.PropTypes.string,
  onClick: React.PropTypes.func,
  id: React.PropTypes.string,
};
