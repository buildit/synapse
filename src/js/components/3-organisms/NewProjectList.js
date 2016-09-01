import React, {
  Component,
  PropTypes,
} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/';
import Button from '../1-atoms/Button';
import NewProjectsTable from '../2-molecules/NewProjectsTable';
import normalizeProject from '../../helpers/normalizeProject';
import filterListByIds from '../../helpers/filterListByIds';

class NewProjectList extends Component {
  componentWillMount() {
    this.props.fetchStarterProjects();
  }

  render() {
    const { starterProjectList, setIsNewProject, initializeNewProject } = this.props;

    const onProjectCreateClick = harvestId => {
      initializeNewProject(harvestId);
      setIsNewProject(true);
      if (harvestId) {
        browserHistory.push(`${harvestId}/edit`);
      } else {
        browserHistory.push('new-project/edit');
      }
    };

    if (this.props.isFetching) {
      return <div>Fetching starter projects list...</div>;
    }

    return (
      <div>
        <Button
          label="Create manually"
          onClick={() => {
            onProjectCreateClick(null);
          }
          }
        />
        <Button
          label="Cancel"
          onClick={() => {
            browserHistory.push('/');
          }}
        />
        <NewProjectsTable
          tableData={starterProjectList || []}
          visibleColumns={[
            'name',
            'portfolio',
            'program',
            'status',
            'description',
          ]}
          rowKey={'id'}
          onProjectCreateClick={onProjectCreateClick}
        />
      </div>
    );
  }
}

NewProjectList.propTypes = {
  fetchStarterProjects: PropTypes.func,
  initializeNewProject: PropTypes.func,
  starterProjectList: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  setIsNewProject: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  // Normalize the raw Harvest project data
  let starterProjectList =
    state.appData.starterProjectList.map(_project => (normalizeProject(_project)));


  // Remove projects already in Synapse
  const existingProjectListIds = state.appData.projectList.map(_project => _project.id);
  starterProjectList = filterListByIds(starterProjectList, existingProjectListIds);

  // Show only Active projects
  starterProjectList = starterProjectList.filter(_project => _project.status === 'Active');

  return (
  {
    starterProjectList,
  }
  );
};

export default connect(mapStateToProps, actionCreators)(NewProjectList);
