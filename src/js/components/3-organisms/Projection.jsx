import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';
import ProjectionChart from 'components/2-molecules/ProjectionChart';
import ProjectionSlider from 'components/1-atoms/ProjectionSlider';
import Button from 'components/1-atoms/Button';
import DateInput from 'components/1-atoms/DateInput';


class Projection extends Component {
  componentDidMount() {
    const { projectId } = this.props.params;
    this.props.fetchProjection(projectId);
  }

  render() {
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

              <ProjectionSlider
                label="Backlog"
                unit="stories"
                legendClass="backlog"
                initialValue={this.props.projection.backlogSize}
                min={10}
                max={300}
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

              <ProjectionSlider
                label="Iteration length"
                unit="week(s)"
                initialValue={this.props.projection.iterationLength}
                min={1}
                max={8}
                onInputChange={value => handleInputChange(value, 'iterationLength')}
              />

              <ProjectionSlider
                label="Target velocity"
                unit="stories per iteration"
                initialValue={this.props.projection.velocityMiddle}
                min={1}
                max={20}
                onInputChange={value => handleInputChange(value, 'velocityMiddle')}
              />

              <hr />

              <ProjectionSlider
                label="Ramp up period"
                unit="iterations"
                initialValue={this.props.projection.periodStart}
                min={0}
                max={30}
                onInputChange={value => handleInputChange(value, 'periodStart')}
              />

              <ProjectionSlider
                label="Velocity start"
                unit="stories per iteration"
                initialValue={this.props.projection.velocityStart}
                min={1}
                max={10}
                onInputChange={value => handleInputChange(value, 'velocityStart')}
              />

              <hr />

              <ProjectionSlider
                label="Ramp down period"
                unit="iterations"
                initialValue={this.props.projection.periodEnd}
                min={0}
                max={30}
                onInputChange={value => handleInputChange(value, 'periodEnd')}
              />

              <ProjectionSlider
                label="Velocity end"
                unit="stories per iteration"
                initialValue={this.props.projection.velocityEnd}
                min={1}
                max={10}
                onInputChange={value => handleInputChange(value, 'velocityEnd')}
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
    startDate: state.appData.project.projection.startDate,
    iterationLength: state.appData.project.projection.iterationLength,
    backlogSize: state.appData.project.projection.backlogSize,
    velocityMiddle: state.appData.project.projection.targetVelocity,
    darkMatter: state.appData.project.projection.darkMatterPercentage,
    periodStart: state.appData.project.projection.startIterations,
    velocityStart: state.appData.project.projection.startVelocity,
    periodEnd: state.appData.project.projection.endIterations,
    velocityEnd: state.appData.project.projection.endVelocity,
  };
  const props = {
    projection,
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
};
