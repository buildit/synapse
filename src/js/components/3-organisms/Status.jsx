import React, {
  Component,
  PropTypes,
} from 'react';
import Chart from '../2-molecules/Chart';
import ChartD3Demand from '../2-molecules/ChartD3Demand';
import LineChart from '../2-molecules/LineChart';
import getDate from '../../helpers/getDate';

class Status extends Component {
  componentDidMount() {
    this.props.fetchStatus(this.props.projectId);
    this.props.fetchProjection(this.props.projectId);
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
        <div className="demandChart">
          <div className="info-box">
            <span className="date"></span>
            <p>
              <span className="y1-label">To do</span>
              <span className="y1"></span>
            </p>
            <p>
              <span className="y2-label">Done</span>
              <span className="y2"></span>
            </p>
          </div>
          <div>
            <h4>Demand</h4>
          </div>
          <div>
            <ChartD3Demand
              data={this.props.demandStatus}
            />
          </div>
        </div>
        <div className="chartHolder">
          <Chart
            title="Defect"
            yLabel="Count"
            data={this.props.defectStatus}
            startDateInMS={startDateInMS}
            endDateInMS={endDateInMS}
          />
        </div>
        <div className="chartHolder">
          <LineChart
            title="Effort"
            yLabel="Person/Days"
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
  fetchProjection: PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  projection: PropTypes.array.isRequired,
  projectionData: PropTypes.array.isRequired,
  projectId: PropTypes.string.isRequired,
  demandStatus: PropTypes.array.isRequired,
  defectStatus: PropTypes.array.isRequired,
  effortStatus: PropTypes.array.isRequired,
};

export default Status;
