import React from 'react';

const Nav = ({ onSwitchView }) => (
  <nav className="navbar">
    <a className="navbar-brand">Synapse</a>
    <ul className="nav navbar-nav">
      <li className="nav-item">
        <a
          className="nav-link"
          onClick={(event) => {
            event.preventDefault();
            onSwitchView('listView');
          }}
        >List view</a>
      </li>
    </ul>
  </nav>
);

Nav.propTypes = {
  onSwitchView: React.PropTypes.func.isRequired,
};

export default Nav;
