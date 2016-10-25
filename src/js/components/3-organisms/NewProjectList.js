import React, {
  Component,
  PropTypes,
} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';
import Button from 'components/1-atoms/Button';
import NewProjectsTable from 'components/2-molecules/NewProjectsTable';
import normalizeProject from 'helpers/normalizeProject';
// import filterListByIds from 'helpers/filterListByIds';

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

    if (this.props.xhr) {
      return <div>Fetching starter projects list...</div>;
    }

    return (
      <div>
        <Button
          label="Create manually"
          cssClasses="button btn btn-primary"
          onClick={() => {
            onProjectCreateClick(null);
          }
          }
        />
        <Button
          label="Cancel"
          cssClasses="button btn btn-secondary"
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
            'description',
          ]}
          rowKey={'name'}
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
  xhr: PropTypes.bool,
  setIsNewProject: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  // Normalize the raw Harvest project data
  const starterProjectList =
    state.projects.starterProjectList.map(_project => (normalizeProject(_project)));

  return (
  {
    starterProjectList,
    xhr: state.xhr,
  }
  );
};

export default connect(mapStateToProps, actionCreators)(NewProjectList);
