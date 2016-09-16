import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/';
import RouteLink from '../1-atoms/RouteLink';
import Text from '../1-atoms/Text';
import Table from '../2-molecules/Table';
import formatDate from '../../helpers/formatDate';
import normalizeProject from '../../helpers/normalizeProject';

class Project extends Component {
  componentDidMount() {
    const { projectId } = this.props.params;
    this.props.fetchProject(projectId);
  }

  render() {
    const { project } = this.props;

    return (
      <div className="project-view">
        <RouteLink
          route={`${project.id}/edit`}
          label="Edit"
        />
        <RouteLink
          route={`${project.id}/projection`}
          label="Projection"
        />
        <RouteLink
          route={`${project.id}/status`}
          label="Status"
        />
        <Text label="ID" content={project.id} />
        <Text label="Name" content={project.name} />
        <Text label="Description" content={project.description} />
        <Text label="Portfolio" content={project.portfolio} />
        <Text label="Program" content={project.program} />
        <Text label="Status" content={project.status} />
        <Text label="Start date" content={formatDate(project.startDate)} />
        <Text label="End date" content={formatDate(project.endDate)} />
        <Text label="Phase" content={project.phase} />

        <div className="subsection">
          <h2>Demand</h2>
          <Text
            label="Source"
            content={project.demand.source}
          />
          <Text
            label="Source URL"
            content={project.demand.url}
          />
          <Text
            label="Project"
            content={project.demand.project}
          />
          <h3>Auth</h3>
          <Text
            label="Auth policy"
            content={project.demand.authPolicy}
          />
          <Text
            label="Username"
            content={project.demand.username}
          />
          <Text
            label="Password"
            content="********"
          />

          <h3>Flow</h3>
          <Table
            tableData={project.demand.flow}
            visibleColumns={['sequence', 'name']}
            rowKey="sequence"
          />
        </div>

        <div className="subsection">
          <h2>Defect</h2>
          <Text
            label="Source"
            content={project.defect.source}
          />
          <Text
            label="Source URL"
            content={project.defect.url}
          />
          <Text
            label="Project"
            content={project.defect.project}
          />
          <h3>Auth</h3>
          <Text
            label="Auth policy"
            content={project.defect.authPolicy}
          />
          <Text
            label="Username"
            content={project.defect.username}
          />
          <Text
            label="Password"
            content="********"
          />

          <h3>Flow</h3>
          <Table
            tableData={project.defect.flow}
            visibleColumns={['sequence', 'name']}
            rowKey="name"
          />

          <h3>Severity</h3>
          <Table
            tableData={project.defect.severity}
            visibleColumns={['sequence', 'name', 'groupWith']}
            rowKey="sequence"
          />
        </div>

        <div className="subsection">
          <h2>Effort</h2>
          <Text
            label="Source"
            content={project.effort.source}
          />
          <Text
            label="Source URL"
            content={project.effort.url}
          />
          <Text
            label="Project"
            content={project.effort.project}
          />
          <h3>Auth</h3>
          <Text
            label="Auth policy"
            content={project.effort.authPolicy}
          />
          <Text
            label="Username"
            content={project.effort.username}
          />
          <Text
            label="Password"
            content="********"
          />

          <h3>Roles</h3>
          <Table
            tableData={project.effort.role}
            visibleColumns={['name', 'groupWith']}
            rowKey="name"
          />
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  project: React.PropTypes.object.isRequired,
  setIsNewProject: React.PropTypes.func.isRequired,
  fetchProject: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  project: normalizeProject(state.appData.project),
});

export default connect(mapStateToProps, actionCreators)(Project);
