import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index.js';
import ProjectionChart from '../2-molecules/ProjectionChart';
import ProjectionSlider from '../1-atoms/ProjectionSlider';
import ProjectionDateInput from '../1-atoms/ProjectionDateInput';
import Button from '../1-atoms/Button';

class Projection extends Component {
  componentDidMount() {
    this.props.fetchProjection(this.props.id);
  }

  render() {
    let dateInput;
    return (
      <div className="projection">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <ProjectionChart
                projection={this.props.projection}
                zoom={this.props.zoom}
              />
            </div>

            <div className="sliders col-md-3">

              <ProjectionSlider
                label="Backlog"
                unit="stories"
                legendClass="backlog"
                initialValue={this.props.projection.backlogSize}
                min={10}
                max={600}
                onInputChange={value => {
                  this.props.updateProjectionBacklogSize(parseInt(value, 10));
                }}
              />

              <ProjectionSlider
                label="Dark matter"
                unit="%"
                legendClass="dark-matter"
                initialValue={this.props.projection.darkMatter}
                min={0}
                max={100}
                onInputChange={value => {
                  this.props.updateProjectionDarkMatter(parseInt(value, 10));
                }}
              />

              <hr />

              <ProjectionSlider
                label="Ramp up period"
                unit="iterations"
                initialValue={this.props.projection.periodStart}
                min={0}
                max={30}
                onInputChange={value => {
                  this.props.updateProjectionPeriodStart(parseInt(value, 10));
                }}
              />

              <ProjectionSlider
                label="Velocity start"
                unit="stories per iteration"
                initialValue={this.props.projection.velocityStart}
                min={1}
                max={10}
                onInputChange={value => {
                  this.props.updateProjectionVelocityStart(parseInt(value, 10));
                }}
              />

              <hr />

              <ProjectionSlider
                label="Ramp down period"
                unit="iterations"
                initialValue={this.props.projection.periodEnd}
                min={0}
                max={30}
                onInputChange={value => {
                  this.props.updateProjectionPeriodEnd(parseInt(value, 10));
                }}
              />

              <ProjectionSlider
                label="Velocity end"
                unit="stories per iteration"
                initialValue={this.props.projection.velocityEnd}
                min={1}
                max={10}
                onInputChange={value => {
                  this.props.updateProjectionVelocityEnd(parseInt(value, 10));
                }}
              />

              <hr />

              <ProjectionSlider
                label="Target velocity"
                unit="stories per iteration"
                initialValue={this.props.projection.velocityMiddle}
                min={1}
                max={20}
                onInputChange={value => {
                  this.props.updateProjectionVelocityMiddle(parseInt(value, 10));
                }}
              />

              <hr />

              <ProjectionSlider
                label="Iteration length"
                initialValue={this.props.projection.iterationLength}
                min={0}
                max={8}
                onInputChange={value => {
                  this.props.updateProjectionIterationLength(parseInt(value, 10));
                }}
              />

              <Button
                label="Save"
                onClick={() => {
                  this.props.saveProjection(this.props.projection, this.props.id);
                }}
              />

              <hr />

              <h3>Zoom</h3>
              <ProjectionDateInput
                label="Max date"
                onInputChange={value => {
                  this.props.updateProjectionZoom('date', value, 10);
                }}
                initialValue
              />

              <ProjectionSlider
                label="Max Y"
                initialValue={this.props.zoom.yAxisMax}
                min={10}
                max={500}
                onInputChange={value => {
                  this.props.updateProjectionZoom('y', parseInt(value, 10));
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
  const props = {
    title: state.appData.project.title,
    id: state.appData.project.id,
    projection: state.projection,
    zoom: state.projectionZoom,
  };
  return props;
}

export default connect(mapStateToProps, actionCreators)(Projection);

Projection.propTypes = {
  projection: PropTypes.object.isRequired,
  zoom: PropTypes.object.isRequired,
  updateProjectionVelocityStart: PropTypes.func.isRequired,
  saveProjection: PropTypes.func.isRequired,
};
