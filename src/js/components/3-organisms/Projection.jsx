import React, {
  Component,
  PropTypes,
} from 'react';

class Projection extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>{this.props.projectName} > projection</h1>
      </div>
    );
  }
}

Projection.propTypes = {
  projectName: PropTypes.string.isRequired,
};

export default Projection;
