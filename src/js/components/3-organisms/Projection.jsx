import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index.js';
import ProjectionChart from '../2-molecules/ProjectionChart';
import ProjectionSlider from '../1-atoms/ProjectionSlider';

class Projection extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>{this.props.projectName}</h1>
        <ProjectionChart
          projection={this.props.projection}
        />
        <ProjectionSlider
          label="Velocity start"
          initialValue={this.props.projection.velocityStart}
          min={1}
          max={10}
          onInputChange={value => {
            this.props.updateProjectionVelocityStart(parseInt(value, 10));
          }}
        />
        <ProjectionSlider
          label="Velocity end"
          initialValue={this.props.projection.velocityEnd}
          min={1}
          max={10}
          onInputChange={value => {
            this.props.updateProjectionVelocityEnd(parseInt(value, 10));
          }}
        />
        <ProjectionSlider
          label="Ramp up period"
          initialValue={this.props.projection.periodStart}
          min={0}
          max={30}
          onInputChange={value => {
            this.props.updateProjectionPeriodStart(parseInt(value, 10));
          }}
        />
        <ProjectionSlider
          label="Ramp down period"
          initialValue={this.props.projection.periodEnd}
          min={0}
          max={30}
          onInputChange={value => {
            this.props.updateProjectionPeriodEnd(parseInt(value, 10));
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state.projection);
  const props = {
    title: state.appData.project.title,
    projection: state.projection,
  };
  return props;
}

export default connect(mapStateToProps, actionCreators)(Projection);

Projection.propTypes = {
  projection: PropTypes.object.isRequired,
  updateProjectionVelocityStart: PropTypes.func.isRequired,
};
