import React, {
  Component,
  PropTypes,
} from 'react';
import Chart from '../2-molecules/Chart';
import ChartWithProjection from '../2-molecules/ChartWithProjection';
import LineChart from '../2-molecules/LineChart';
import getDate from '../../helpers/getDate';
const makePoints = require('../../helpers/makePoints');

class Status extends Component {
  componentDidMount() {
    this.props.fetchStatus(this.props.projectId);
    this.props.fetchProjection(this.props.projectId);
  }

  render() {
    let projectionPoints = makePoints(this.props.projection, '15-Nov-15');
    let startDateInMS = 0;
    let endDateInMS = 0;
    if (this.props.project) {
      startDateInMS = getDate.utc(this.props.project.startDate);
      endDateInMS = getDate.utc(this.props.project.endDate);
    }
    return (
      <div>
        <ChartWithProjection
          title="Demand"
          yLabel="Stories"
          data={this.props.demandStatus}
          projectionData={projectionPoints}
          startDateInMS={startDateInMS}
          endDateInMS={endDateInMS}
        />
        <div>
          <button id="projectonButton">Projection</button>
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
