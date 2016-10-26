import React from 'react';

const Header = ({ projectName = '', onLogoClick }) => (
  <div>
    <div className="header">
      <span
        className="logo"
        onClick={onLogoClick}
      >Synapse</span>
      <span className="project-name">{projectName}</span>
    </div>
  </div>
);

Header.propTypes = {
  onLogoClick: React.PropTypes.func.isRequired,
  projectName: React.PropTypes.string,
  message: React.PropTypes.string,
};

export default Header;
