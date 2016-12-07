import React, {
  Component,
  PropTypes,
} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';
import Button from 'components/1-atoms/Button';
import Spinner from 'components/1-atoms/Spinner';
import NewProjectsTable from 'components/2-molecules/NewProjectsTable';

class NewProjectList extends Component {
  componentWillMount() {
    this.props.fetchStarterProjects();
  }

  render() {
    if (this.props.xhr) return <Spinner />;

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

    return (
      <div>
        <Button
          label="Create manually"
          cssClasses="button btn btn-primary"
          id="createManually"
          onClick={() => {
            onProjectCreateClick(null);
          }
          }
        />
        <Button
          label="Cancel"
          cssClasses="button btn btn-secondary"
          id="cancelCreate"
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
  setIsNewProject: PropTypes.func.isRequired,
  xhr: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  starterProjectList: state.projects.starterProjectList,
  xhr: state.xhr,
});

export default connect(mapStateToProps, actionCreators)(NewProjectList);
