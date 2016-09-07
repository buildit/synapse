import React from 'react';
import { version } from '../../../../package.json';

const Footer = () => {
  const appVersion = version;

  return (
    <div className="footer">
      <span className="app-version">Version: {appVersion}</span>
    </div>
  );
};

Footer.propTypes = {
};

export default Footer;
