import React from 'react';

const Text = ({ label, content }) => (
  <div className="text">
    <span className="text-label">{label}</span>
    <span className="text-content">{content}</span>
  </div>
);

Text.propTypes = {
  label: React.PropTypes.string,
  content: React.PropTypes.string,
};

export default Text;
