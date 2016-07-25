import React, {
  Component,
  PropTypes,
} from 'react';
import Chart from '../2-molecules/Chart';
import LineChart from '../2-molecules/LineChart';

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
        <div className="chartHolder">
          <LineChart
            title="Defect"
            yLabel="Severity"
            data={this.props.defectStatus}
          />
        </div>
        <div className="chartHolder">
          <LineChart
            title="Effort"
            yLabel="Activity"
            data={this.props.effortStatus}
          />
        </div>
      </div>
    );
  }
}

Status.propTypes = {
  fetchStatus: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  demandStatus: PropTypes.array.isRequired,
  defectStatus: PropTypes.array.isRequired,
  effortStatus: PropTypes.array.isRequired,
};

export default Status;
