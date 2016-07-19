import React, {
  Component,
  PropTypes,
} from 'react';
import Chart from '../2-molecules/Chart';

class Status extends Component {
  componentDidMount() {
    this.props.fetchStatus(this.props.projectId);
  }

  render() {
    return (
      <div>
        <h1>Project status</h1>
        <Chart
          title="Demand"
          data={this.props.demandStatus}
        />
      </div>
    );
  }
}

Status.propTypes = {
  fetchStatus: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  demandStatus: PropTypes.array.isRequired,
};

export default Status;
