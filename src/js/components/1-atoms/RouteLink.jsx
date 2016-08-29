import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const RouteLink = ({ route, label }) => (
  <span className="route-link">
    <Link
      to={`${route}`}
      activeStyle={{
        textDecoration: 'none',
        color: 'gray',
      }}
    >
      {label}
    </Link>
  </span>
);

RouteLink.propTypes = {
  route: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default RouteLink;
