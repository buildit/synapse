import React, { PropTypes } from 'react';

const MessageBar = ({ message }) => {
  if (message) {
    return (
      <div className="message-bar">
        <span className="message-text">{message}</span>
      </div>
    );
  }
  return <span></span>;
};

export default MessageBar;

MessageBar.propTypes = {
  message: PropTypes.string,
};
