import React, {
  Component,
  PropTypes,
} from 'react';
import Button from '../1-atoms/Button';
import TableWithAction from '../2-molecules/TableWithAction';

class NewProjectList extends Component {
  componentDidMount() {
    this.props.fetchStarterProjects();
  }

  render() {
    const { starterProjects, setIsNewProject } = this.props;

    const onProjectCreateClick = (harvestId) => {
      this.props.initializeNewProject(harvestId);
      this.props.onSwitchView('editProject');
    };

    if (this.props.isFetching) {
      return <div>Fetching starter projects list...</div>;
    }

    return (
      <div>
        <Button
          label="Create manually"
          onClick={() => {
            setIsNewProject(true);
            onProjectCreateClick(null);
          }
          }
        />
        <Button
          label="Cancel"
          onClick={this.props.goHome}
        />
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
  goHome: PropTypes.func,
  setIsNewProject: PropTypes.func.isRequired,
};

export default NewProjectList;
