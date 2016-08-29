import React from 'react';
import { Link } from 'react-router';

const ProjectLink = ({ id, children }) => (
  <Link
    to={id}
  >
    {children}
  </Link>
);

export default ProjectLink;

ProjectLink.propTypes = {
  id: React.PropTypes.string,
};
