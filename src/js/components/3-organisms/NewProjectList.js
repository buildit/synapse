import React, {
  Component,
  PropTypes,
} from 'react';
import TableWithAction from '../2-molecules/TableWithAction';
// import blankProject from '../../helpers/blankProject';

class NewProjectList extends Component {
  componentDidMount() {
    this.props.fetchStarterProjects();
  }

  render() {
    const { starterProjects } = this.props;

    // Should we have a "blank" starter project?
    // starterProjects.push(blankProject);

    const onProjectCreateClick = (harvestId) => {
      this.props.initializeNewProject(harvestId);
      this.props.onSwitchView('editProject');
    };

    if (this.props.isFetching) {
      return <div>Fetching starter projects list...</div>;
    }

    return (
      <div>
        <TableWithAction
          tableData={starterProjects || []}
          visibleColumns={[
            'name',
            'portfolio',
            'program',
            'status',
            'description',
          ]}
          rowKey={'id'}
          onActionClick={onProjectCreateClick}
          actionLabel="Create"
        />
      </div>
    );
  }
}

NewProjectList.propTypes = {
  fetchStarterProjects: PropTypes.func,
  onSwitchView: PropTypes.func,
  initializeNewProject: PropTypes.func,
  starterProjects: PropTypes.array,
  isFetching: PropTypes.bool,
  projectList: PropTypes.array,
};

export default NewProjectList;
