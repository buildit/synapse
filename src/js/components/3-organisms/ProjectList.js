import React, {
  Component,
  PropTypes,
} from 'react';
import Button from '../1-atoms/Button';
import TableWithAction from '../2-molecules/TableWithAction';

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
      <div>
        <Button
          label="New"
          onClick={() => {
            this.props.onSwitchView('newProjectList');
          }}
        />
        <TableWithAction
          tableData={this.props.projects || []}
          visibleColumns={[
            'name',
            'portfolio',
            'program',
            'status',
            'description',
          ]}
          rowKey={'id'}
          onActionClick={onProjectViewClick}
          actionLabel="View"
        />
      </div>
    );
  }
}

ProjectList.propTypes = {
  fetchProjects: PropTypes.func,
  fetchProject: PropTypes.func,
  onSwitchView: PropTypes.func,
  projects: PropTypes.array,
  isFetching: PropTypes.bool,
};

export default ProjectList;
