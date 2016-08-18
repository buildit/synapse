import React, {
  Component,
  PropTypes,
} from 'react';
import StatusChart from '../2-molecules/StatusChart';

class Status extends Component {
  componentDidMount() {
    this.props.fetchStatus(this.props.projectId);
  }

  render() {
    const demandCategories = this.props.project.demand.flow.map(item => (item.name));
    const defectCategories = this.props.project.defect.severity.map(item => (item.name));
    const effortCategories = this.props.project.effort.role.map(item => (item.name));

    return (
      <StatusChart
        data={this.props.demandStatus}
        defectStatus={this.props.defectStatus}
        demandCategories={demandCategories}
        defectCategories={defectCategories}
        effortCategories={effortCategories}
      />
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
