import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';
import ProjectionChart from 'components/2-molecules/ProjectionChart';
import ProjectionSlider from 'components/1-atoms/ProjectionSlider';
import ProjectionIntegerInput from 'components/1-atoms/ProjectionIntegerInput';
import Button from 'components/1-atoms/Button';
import Spinner from 'components/1-atoms/Spinner';
import DateInput from 'components/1-atoms/DateInput';

class Projection extends Component {
  componentDidMount() {
    const { projectId } = this.props.params;
    this.props.fetchProjection(projectId);
  }

  render() {
    if (this.props.xhr) return <Spinner />;

    const { projectId } = this.props.params;

    const handleInputChange = (inputValue, key) => {
      const projection = this.props.projection || {};
      const parsedValue = key !== 'startDate' ? parseInt(inputValue, 10) : inputValue;
      projection[key] = parsedValue;
      this.props.updateProjection({
        startDate: projection.startDate,
        iterationLength: projection.iterationLength,
        backlogSize: projection.backlogSize,
        targetVelocity: projection.velocityMiddle,
        darkMatterPercentage: projection.darkMatter,
        startIterations: projection.periodStart,
        startVelocity: projection.velocityStart,
        endIterations: projection.periodEnd,
        endVelocity: projection.velocityEnd,
      });
    };

    return (
      <div className="projection">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <ProjectionChart
                projection={this.props.projection}
              />
            </div>

            <div className="sliders col-md-3">

              <ProjectionIntegerInput
                label="Backlog"
                unit="stories"
                legendClass="backlog"
                initialValue={this.props.projection.backlogSize}
                onInputChange={value => handleInputChange(value, 'backlogSize')}
              />

              <ProjectionSlider
                label="Dark matter"
                unit="%"
                legendClass="dark-matter"
                initialValue={this.props.projection.darkMatter}
                min={0}
                max={100}
                onInputChange={value => handleInputChange(value, 'darkMatter')}
              />

              <hr />

              <ProjectionIntegerInput
                label="Target velocity"
                unit="stories per iteration"
                initialValue={this.props.projection.velocityMiddle}
                onInputChange={value => handleInputChange(value, 'velocityMiddle')}
              />

              <ProjectionSlider
                label="Iteration length"
                unit="week(s)"
                initialValue={this.props.projection.iterationLength}
                min={1}
                max={8}
                onInputChange={value => handleInputChange(value, 'iterationLength')}
              />

              <hr />

              <ProjectionIntegerInput
                label="Velocity start"
                unit="stories per iteration"
                initialValue={this.props.projection.velocityStart}
                onInputChange={value => handleInputChange(value, 'velocityStart')}
              />

              <ProjectionSlider
                label="Ramp up period"
                unit="iterations"
                initialValue={this.props.projection.periodStart}
                min={0}
                max={30}
                onInputChange={value => handleInputChange(value, 'periodStart')}
              />

              <hr />

              <ProjectionIntegerInput
                label="Velocity end"
                unit="stories per iteration"
                initialValue={this.props.projection.velocityEnd}
                onInputChange={value => handleInputChange(value, 'velocityEnd')}
              />

              <ProjectionSlider
                label="Ramp down period"
                unit="iterations"
                initialValue={this.props.projection.periodEnd}
                min={0}
                max={30}
                onInputChange={value => handleInputChange(value, 'periodEnd')}
              />

              <DateInput
                label="Start date"
                initialValue={this.props.projection.startDate}
                onInputChange={value => handleInputChange(value, 'startDate')}
              />

              <Button
                label="Save"
                cssClasses="button btn btn-primary"
                onClick={() => {
                  this.props.saveProjection(this.props.projection, projectId);
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
  const projection = {
    startDate: state.project.projection.startDate,
    iterationLength: state.project.projection.iterationLength,
    backlogSize: state.project.projection.backlogSize,
    velocityMiddle: state.project.projection.targetVelocity,
    darkMatter: state.project.projection.darkMatterPercentage,
    periodStart: state.project.projection.startIterations,
    velocityStart: state.project.projection.startVelocity,
    periodEnd: state.project.projection.endIterations,
    velocityEnd: state.project.projection.endVelocity,
  };
  const props = {
    projection,
    xhr: state.xhr,
  };
  return props;
}

export default connect(mapStateToProps, actionCreators)(Projection);

Projection.propTypes = {
  params: PropTypes.object.isRequired,
  projection: PropTypes.object.isRequired,
  fetchProjection: PropTypes.func.isRequired,
  updateProjection: PropTypes.func.isRequired,
  saveProjection: PropTypes.func.isRequired,
  xhr: PropTypes.bool.isRequired,
};
