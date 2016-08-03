import React, { PropTypes } from 'react';

const MessageBar = ({ message, dismissMessage }) => {
  if (message) {
    return (
      <span className="message-bar">
        <span className="message-text">{message}</span>
        <span
          className="dismiss-icon fa fa-times-circle"
          aria-hidden="true"
          onClick={() => {
            dismissMessage();
          }}
        ></span>
      </span>
    );
  }
  return <span></span>;
};

export default MessageBar;

MessageBar.propTypes = {
  message: PropTypes.string,
  dismissMessage: PropTypes.func.isRequired,
};
