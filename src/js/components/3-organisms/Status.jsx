import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../../actions/';
import StatusChart from '../2-molecules/StatusChart';
import transformStatusData from '../../helpers/transformStatusData';
import makePoints from '../../helpers/makePoints';

class Status extends Component {
  componentDidMount() {
    console.log('this.props', this.props);
    const { projectId } = this.props.params;
    this.props.fetchStatus(projectId);
    this.props.fetchProjection(projectId);
  }

  render() {
    const demandCategories = this.props.project.demand.flow.map(item => (item.name));
    const defectCategories = this.props.project.defect.severity.map(item => (item.name));
    const effortCategories = this.props.project.effort.role.map(item => (item.name));

    const projectionOverlayStartDate = moment(
      this.props.projection.startDate,
      'YYYY MM DD').format('DD-MMM-YY'
    );

    const { projection } = this.props;

    const { iterationLength } = projection;
    const projectionPoints = makePoints(projection, projectionOverlayStartDate, iterationLength);

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
            projectionPoints={projectionPoints}
          />
        </div>
      </div>
    );
  }

}

Status.propTypes = {
};

const mapStateToProps = state => {
  const demandStatus = transformStatusData(state.appData.demandStatus, 'status');
  const defectStatus = transformStatusData(state.appData.defectStatus, 'severity');
  const effortStatus = transformStatusData(state.appData.effortStatus, 'activity');

  console.log('state', state);
  return {
    project: state.appData.project,
    projection: state.projection,
    demandStatus,
    defectStatus,
    effortStatus,
  };
};

export default connect(mapStateToProps, actionCreators)(Status);
