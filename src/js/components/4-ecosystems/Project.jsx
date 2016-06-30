import React from 'react';
import Text from '../1-atoms/text';
import moment from 'moment';

const formatDate = date => {
  if (date) {
    return moment(date).format('MMMM Do YYYY');
  }
  return '';
};

const Flow = <p>Placeholder for flow component.</p>;

const Project = ({ project }) => (
  <div>
    <h1>{project.name}</h1>

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
    </div>

  </div>
);

export default Project;

Project.propTypes = {
  project: React.PropTypes.object.isRequired,
};
