import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/';
import Text from '../1-atoms/Text';
import Button from '../1-atoms/Button';
import Table from '../2-molecules/Table';
import formatDate from '../../helpers/formatDate';

class Project extends Component {
  componentDidMount() {
    const { projectId } = this.props.params;
    this.props.fetchProject(projectId);
  }

  render() {
    const { project } = this.props;
    console.log('project', project);
    return (
      <div>
        <Text label="ID" content={project.id} />
        <Text label="Name" content={project.name} />
        <Text label="Description" content={project.description} />
        <Text label="Portfolio" content={project.portfolio} />
        <Text label="Program" content={project.program} />
        <Text label="Status" content={project.status} />
        <Text label="Start date" content={formatDate(project.startDate)} />
        <Text label="End date" content={formatDate(project.endDate)} />
        <Text label="Phase" content={project.phase} />
      </div>
    );
  }
}

Project.propTypes = {
  project: React.PropTypes.object.isRequired,
  setIsNewProject: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  console.log('state', state);
  return (
    {
      project: state.appData.project,
    }
  );
}

export default connect(mapStateToProps, actionCreators)(Project);
