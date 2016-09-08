import React from 'react';
import MessageBar from './MessageBar';

const Header = ({ projectName, onLogoClick, message, dismissMessage }) => {
  const decoratedProjectName = projectName ? `| ${projectName}` : '';

  return (
    <div className="header">
      <span
        className="site-title"
        onClick={onLogoClick}
      >Synapse</span>
      <span className="project-name">{decoratedProjectName}</span>
      <MessageBar
        dismissMessage={dismissMessage}
        message={message}
      />
    </div>
  );
};

Header.propTypes = {
  onLogoClick: React.PropTypes.func.isRequired,
  projectName: React.PropTypes.string,
  message: React.PropTypes.string,
  dismissMessage: React.PropTypes.func,
};

export default Header;
