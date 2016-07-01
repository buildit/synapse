import React from 'react';

const Link = ({ label, onClick }) => (
  <a
    onClick={(event) => {
      event.preventDefault();
      onClick();
    }}
  >{label}
  </a>
);

export default Link;

Link.propTypes = {
  label: React.PropTypes.string,
  onClick: React.PropTypes.func,
};
