import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/';
import StatusChart from '../2-molecules/StatusChart';
import transformStatusData from '../../helpers/transformStatusData';

// TODO: Move this to separate file. Abstract to handle an array of arrays.
const dataExists = ({ demandStatus, defectStatus, effortStatus }) => (
  demandStatus.length > 0
  // || defectStatus.length > 0
  // || effortStatus.length > 0
);

class Status extends Component {
  componentDidMount() {
    const { projectId } = this.props.params;
    // TODO: Make these fetches one promise so React doesn't fire every time data comes back.
    //  Then can do dataExists the right way, looking for any data.
    this.props.fetchStatus(projectId);
    this.props.fetchProject(projectId);
    this.props.fetchProjection(projectId);
  }

  render() {
    let component = <div>Loading...</div>;
    if (dataExists(this.props)) {
      component = (
        <StatusChart
          data={this.props.demandStatus}
          defectStatus={this.props.defectStatus}
          effortStatus={this.props.effortStatus}
          demandCategories={this.props.demandCategories}
          defectCategories={this.props.defectCategories}
          effortCategories={this.props.effortCategories}
          projection={this.props.projection}
          hasProjection={this.props.hasProjection}
        />
    );
    }

    return component;
  }
}

Status.propTypes = {
  fetchStatus: PropTypes.func.isRequired,
  fetchProject: PropTypes.func.isRequired,
  fetchProjection: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  projection: PropTypes.object.isRequired,
  demandStatus: PropTypes.array.isRequired,
  defectStatus: PropTypes.array.isRequired,
  effortStatus: PropTypes.array.isRequired,
  demandCategories: PropTypes.array.isRequired,
  defectCategories: PropTypes.array.isRequired,
  effortCategories: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  hasProjection: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const demandStatus = transformStatusData(state.appData.demandStatus, 'status');
  const defectStatus = transformStatusData(state.appData.defectStatus, 'severity');
  const effortStatus = transformStatusData(state.appData.effortStatus, 'activity');

  const demandCategories = state.appData.project.demand.flow.map(item => (item.name));
  const defectCategories = state.appData.project.defect.severity.map(item => (item.name));
  const effortCategories = state.appData.project.effort.role.map(item => (item.name));

  return {
    project: state.appData.project,
    demandStatus,
    defectStatus,
    effortStatus,
    demandCategories,
    defectCategories,
    effortCategories,
    projection: state.projection,
    hasProjection: state.hasProjection,
  };
};

export default connect(mapStateToProps, actionCreators)(Status);
