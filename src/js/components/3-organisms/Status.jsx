import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import { fetchAllStatusData } from 'actions/fetchAllStatusData';
import StatusChart from 'components/2-molecules/StatusChart';
import transformStatusData from 'helpers/transformStatusData';

class Status extends Component {
  componentDidMount() {
    const { projectId } = this.props.params;
    this.props.fetchAllStatusData(projectId);
  }

  render() {
    let component = <div></div>;

    if (this.props.isFetching) {
      component = <div>Loading...</div>;
    }

    if (!this.props.isFetching && this.props.project.name) {
      component = (
        <StatusChart
          demandStatus={this.props.demandStatus}
          defectStatus={this.props.defectStatus}
          effortStatus={this.props.effortStatus}
          demandCategories={this.props.demandCategories}
          defectCategories={this.props.defectCategories}
          effortCategories={this.props.effortCategories}
          projection={this.props.projection}
        />
    );
    }

    return component;
  }
}

Status.propTypes = {
  fetchAllStatusData: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  projection: PropTypes.object.isRequired,
  demandStatus: PropTypes.array.isRequired,
  defectStatus: PropTypes.array.isRequired,
  effortStatus: PropTypes.array.isRequired,
  demandCategories: PropTypes.array.isRequired,
  defectCategories: PropTypes.array.isRequired,
  effortCategories: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const demandStatus = transformStatusData(state.appData.status.demand, 'status');
  const defectStatus = transformStatusData(state.appData.status.defect, 'severity');
  const effortStatus = transformStatusData(state.appData.status.effort, 'activity');

  const demandCategories = state.appData.project.demand.flow.map(item => (item.name));
  const defectCategories = state.appData.project.defect.severity.map(item => (item.name));
  const effortCategories = state.appData.project.effort.role.map(item => (item.name));
  let projection = {};
  if (state.appData.project.projection) {
    projection = {
      backlogSize: state.appData.project.projection.backlogSize,
      darkMatter: state.appData.project.projection.darkMatterPercentage,
      iterationLength: state.appData.project.projection.iterationLength,
      periodEnd: state.appData.project.projection.endIterations,
      periodStart: state.appData.project.projection.startIterations,
      startDate: state.appData.project.projection.startDate,
      velocityEnd: state.appData.project.projection.endVelocity,
      velocityMiddle: state.appData.project.projection.targetVelocity,
      velocityStart: state.appData.project.projection.startVelocity,
    };
  }

  return {
    project: state.appData.project,
    demandStatus,
    defectStatus,
    effortStatus,
    demandCategories,
    defectCategories,
    effortCategories,
    projection,
    isFetching: state.isFetching,
  };
};

export default connect(mapStateToProps, { fetchAllStatusData })(Status);
