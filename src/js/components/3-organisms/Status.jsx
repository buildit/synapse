import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import { fetchAllStatusData } from 'actions';
import StatusChart from 'components/2-molecules/StatusChart';
import transformStatusData from 'helpers/transformStatusData';
import Spinner from 'components/1-atoms/Spinner';
import getForecastedCompletionDate from 'helpers/getForecastedCompletionDate';

class Status extends Component {
  componentDidMount() {
    const { projectId } = this.props.params;
    this.props.fetchAllStatusData(projectId);
  }

  render() {
    if (this.props.xhr) return <Spinner />;

    let component = <div></div>;

    if (!this.props.xhr && this.props.project.name) {
      component = (
        <StatusChart
          demandStatus={this.props.demandStatus}
          defectStatus={this.props.defectStatus}
          effortStatus={this.props.effortStatus}
          demandCategories={this.props.demandCategories}
          defectCategories={this.props.defectCategories}
          effortCategories={this.props.effortCategories}
          projection={this.props.projection}
          forecastedCompletionDate={this.props.forecastedCompletionDate}
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
  xhr: PropTypes.bool,
  forecastedCompletionDate: PropTypes.string,
};

const mapStateToProps = state => {
  const demandStatus = transformStatusData(state.status.demand, 'status');
  const defectStatus = transformStatusData(state.status.defect, 'severity');
  const effortStatus = transformStatusData(state.status.effort, 'activity');

  const demandCategories = state.project.demand.flow ?
    state.project.demand.flow.map(item => (item.name)) : [];
  const defectCategories = state.project.defect.severity ?
    state.project.defect.severity.map(item => (item.name)) : [];
  const effortCategories = state.project.effort.role ?
    state.project.effort.role.map(item => (item.name)) : [];

  let projection = {};
  if (state.project.projection) {
    projection = {
      backlogSize: state.project.projection.backlogSize,
      darkMatter: state.project.projection.darkMatterPercentage,
      iterationLength: state.project.projection.iterationLength,
      periodEnd: state.project.projection.endIterations,
      periodStart: state.project.projection.startIterations,
      startDate: state.project.projection.startDate,
      velocityEnd: state.project.projection.endVelocity,
      velocityMiddle: state.project.projection.targetVelocity,
      velocityStart: state.project.projection.startVelocity,
    };
  }

  const forecastedCompletionDate = getForecastedCompletionDate(demandStatus);

  return {
    project: state.project,
    demandStatus,
    defectStatus,
    effortStatus,
    demandCategories,
    defectCategories,
    effortCategories,
    projection,
    xhr: state.xhr,
    forecastedCompletionDate,
  };
};

export default connect(mapStateToProps, { fetchAllStatusData })(Status);
