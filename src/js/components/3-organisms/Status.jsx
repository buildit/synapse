import React, {
  Component,
  PropTypes,
} from 'react';
import StatusChart from '../2-molecules/StatusChart';
const makePoints = require('../../helpers/makePoints');
import moment from 'moment';

class Status extends Component {
  componentDidMount() {
    this.props.fetchStatus(this.props.projectId);
  }

  render() {
    const demandCategories = this.props.project.demand.flow.map(item => (item.name));
    const defectCategories = this.props.project.defect.severity.map(item => (item.name));
    const effortCategories = this.props.project.effort.role.map(item => (item.name));
    const projectStartDate = moment('2015-10-29', 'YYYY MM DD').format('DD-MMM-YY');

    const { projection } = this.props;
    const startDate = moment(this.props.projection.startDate, 'YYYY MM DD').format('DD-MMM-YY');

    // console.log('Difference is ', startDate.diff(projectStartDate, 'days'), 'days');
    const { iterationLength } = projection;
    const projectionPoints = makePoints(projection, startDate, iterationLength);

    return (
      <div>
        <div>
          <StatusChart
            data={this.props.demandStatus}
            defectStatus={this.props.defectStatus}
            effortStatus={this.props.effortStatus}
            demandCategories={demandCategories}
            defectCategories={defectCategories}
            effortCategories={effortCategories}
            projectId={this.props.projectId}
            projectionPoints={projectionPoints}
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
  projection: React.PropTypes.object.isRequired,
  projectionPoints: PropTypes.array.isRequired,
  startDate: React.PropTypes.string,
};

export default Status;
