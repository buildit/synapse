import React from 'react';
import Text from '../1-atoms/Text';
import Button from '../1-atoms/Button';
import Table from '../2-molecules/Table';
import formatDate from '../../helpers/formatDate';

const Project = ({ project, onSwitchView }) => {
  let projectDemand = project.demand;
  let projectDefect = project.defect;
  let projectEffort = project.effort;

  if (!projectDemand) {
    projectDemand = {
      flow: [],
    };
  }

  if (!projectDefect) {
    projectDefect = {
      flow: [],
      severity: [],
    };
  }

  if (!projectEffort) {
    projectEffort = {
      role: [],
    };
  }

  return (
    <div>
      <h1>{project.name}</h1>

      <Button
        label="Edit"
        onClick={() => {
          onSwitchView('editProject');
        }}
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
          content={projectDemand.source}
        />
        <Text
          label="Source URL"
          content={projectDemand.url}
        />
        <Text
          label="Project"
          content={projectDemand.project}
        />
        <h3>Auth</h3>
        <Text
          label="Auth policy"
          content={projectDemand.authPolicy}
        />
        <Text
          label="Username"
          content={projectDemand.username}
        />
        <Text
          label="Password"
          content="********"
        />

        <h3>Flow</h3>
        <Table
          tableData={projectDemand.flow}
          visibleColumns={['sequence', 'name']}
          rowKey="sequence"
        />
      </div>

      <div className="subsection">
        <h2>Defect</h2>
        <Text
          label="Source"
          content={projectDefect.source}
        />
        <Text
          label="Source URL"
          content={projectDefect.url}
        />
        <Text
          label="Project"
          content={projectDefect.project}
        />
        <h3>Auth</h3>
        <Text
          label="Auth policy"
          content={projectDefect.authPolicy}
        />
        <Text
          label="Username"
          content={projectDefect.username}
        />
        <Text
          label="Password"
          content="********"
        />

        <h3>Flow</h3>
        <Table
          tableData={projectDefect.flow}
          visibleColumns={['sequence', 'name']}
          rowKey="name"
        />

        <h3>Severity</h3>
        <Table
          tableData={projectDefect.severity}
          visibleColumns={['sequence', 'name', 'groupWith']}
          rowKey="sequence"
        />
      </div>

      <div className="subsection">
        <h2>Effort</h2>
        <Text
          label="Source"
          content={projectEffort.source}
        />
        <Text
          label="Source URL"
          content={projectEffort.url}
        />
        <Text
          label="Project"
          content={projectEffort.project}
        />
        <h3>Auth</h3>
        <Text
          label="Auth policy"
          content={projectEffort.authPolicy}
        />
        <Text
          label="Username"
          content={projectEffort.username}
        />
        <Text
          label="Password"
          content="********"
        />

        <h3>Roles</h3>
        <Table
          tableData={projectEffort.role}
          visibleColumns={['name', 'groupWith']}
          rowKey="name"
        />
      </div>
    </div>
  );
};

Project.propTypes = {
  project: React.PropTypes.object.isRequired,
};

export default Project;
