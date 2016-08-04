import React, {
  Component,
  PropTypes,
} from 'react';
import Chart from '../2-molecules/Chart';
import LineChart from '../2-molecules/LineChart';
import getDate from '../../helpers/getDate';

class Status extends Component {
  componentDidMount() {
    this.props.fetchStatus(this.props.projectId);
  }

  render() {
    let startDateInMS = 0;
    let endDateInMS = 0;
    if (this.props.project) {
      startDateInMS = getDate.utc(this.props.project.startDate);
      endDateInMS = getDate.utc(this.props.project.endDate);
    }
    return (
      <div>
        <Chart
          title="Demand"
          yLabel="Stories"
          data={this.props.demandStatus}
          startDateInMS={startDateInMS}
          endDateInMS={endDateInMS}
        />
        <div className="chartHolder">
          <Chart
            title="Defect"
            yLabel="Severity"
            data={this.props.defectStatus}
            startDateInMS={startDateInMS}
            endDateInMS={endDateInMS}
          />
        </div>
        <div className="chartHolder">
          <LineChart
            title="Effort"
            yLabel="Activity"
            data={this.props.effortStatus}
            startDateInMS={startDateInMS}
            endDateInMS={endDateInMS}
          />
        </div>
      </div>
    );
  }
}

Status.propTypes = {
  fetchStatus: PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  demandStatus: PropTypes.array.isRequired,
  defectStatus: PropTypes.array.isRequired,
  effortStatus: PropTypes.array.isRequired,
};

export default Status;
