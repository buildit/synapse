import React from 'react';

const Nav = ({ onSwitchView, links, currentLink }) => {
  const visibleLinks = links.map((link, index) => {
    if (link.label === currentLink) {
      return (
        <li
          key={index}
          className="nav-item"
        >
          <a className="nav-link current-link">{link.label}</a>
        </li>
      );
    }
    return (
      <li
        key={index}
        className="nav-item"
      >
        <a
          className="nav-link"
          onClick={(event) => {
            event.preventDefault();
            onSwitchView(link.view);
          }}
        >{link.label}</a>
      </li>
    );
  }
);

  return (
    <nav className="navbar">
      <a className="navbar-brand">Synapse</a>
      <ul className="nav navbar-nav">
        {visibleLinks}
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  onSwitchView: React.PropTypes.func.isRequired,
  links: React.PropTypes.array.isRequired,
  currentLink: React.PropTypes.object.isRequired,
};

export default Nav;
