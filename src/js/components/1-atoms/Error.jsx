import React, { PropTypes } from 'react';

const Error = ({ message = 'There was an error.' }) => (
  <div className="alert alert-danger" role="alert">
    <strong>There was an error:</strong> {message}
  </div>
);

export default Error;

Error.propTypes = {
  message: PropTypes.string,
};
