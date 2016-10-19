import React from 'react';

// onClick handler (the old way).  Save in case changing it breaks something.
// onClick={() => {
//   onClick();
// }}

const Icon = ({ icon, onClick }) => (
  <span
    onClick={onClick}
    className={icon}
    aria-hidden="true"
  >
  </span>
);

export default Icon;

Icon.propTypes = {
  icon: React.PropTypes.string,
  onClick: React.PropTypes.func,
};
