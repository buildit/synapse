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
      <div className="projection">
        <h1>{this.props.projectName}</h1>
        <ProjectionChart
          projection={this.props.projection}
        />
        <div className="container">
          <div className="row sliders">

            <div className="col-md-3">
              <ProjectionSlider
                label="Backlog"
                legendClass="backlog"
                initialValue={this.props.projection.backlogSize}
                min={10}
                max={600}
                onInputChange={value => {
                  this.props.updateProjectionBacklogSize(parseInt(value, 10));
                }}
              />
              <ProjectionSlider
                label="Dark matter (%)"
                legendClass="dark-matter"
                initialValue={this.props.projection.darkMatter}
                min={0}
                max={100}
                onInputChange={value => {
                  this.props.updateProjectionDarkMatter(parseInt(value, 10));
                }}
              />
            </div>

            <div className="col-md-3">
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
                label="Target velocity"
                initialValue={this.props.projection.velocityMiddle}
                min={1}
                max={20}
                onInputChange={value => {
                  this.props.updateProjectionVelocityMiddle(parseInt(value, 10));
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
            </div>

            <div className="col-md-3">
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
          </div>
        </div>
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
