import React, {
  Component,
  PropTypes,
} from 'react';
import TableWithButton from './TableWithActionWithButton';

class ProjectList extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const onProjectViewClick = (id) => {
      this.props.fetchProject(id);
    };
    if (this.props.isFetching) {
      return <div>Fetching project list...</div>;
    }
    return (
      <TableWithButton
        buttonText={"New"}
        tableData={this.props.projects || []}
        visibleColumns={[
          'name',
          'portfolio',
          'program',
          'status',
          'description',
        ]}
        rowKey={'id'}
        onProjectViewClick={onProjectViewClick}
      />
    );
  }
}

ProjectList.propTypes = {
  fetchProjects: PropTypes.func,
  fetchProject: PropTypes.func,
  projects: PropTypes.array,
  isFetching: PropTypes.bool,
};

export default ProjectList;
