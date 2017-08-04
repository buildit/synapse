import React, {
  Component,
  PropTypes,
} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject } from 'actions/projects';
import Button from 'whippersnapper/build/Button.js';
import Spinner from 'components/1-atoms/Spinner';
import ProjectsTable from 'components/2-molecules/ProjectsTable';

class ProjectList extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const { xhr, isAuthenticated } = this.props;
    let newButton;
    if (isAuthenticated) {
      newButton = (
        <Button
          label="New"
          cssClasses="normal"
          onClick={() => {
            browserHistory.push('/new');
          }}
        />);
    }

    if (xhr) return <Spinner />;

    return (
      <div className="project-list">
        {newButton}
        <div className="main">
          <ProjectsTable
            tableData={this.props.projectList || []}
            visibleColumns={[
              'name',
              'portfolio',
              'program',
              'ragStatus',
              'description',
            ]}
            rowKey={'name'}
            deleteProject={this.props.deleteProject}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    );
  }
}

ProjectList.propTypes = {
  fetchProjects: PropTypes.func,
  fetchProject: PropTypes.func,
  deleteProject: PropTypes.func,
  projectList: PropTypes.array,
  xhr: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    projectList: state.projects.projectList,
    xhr: state.xhr,
    isAuthenticated: state.auth.isAuthenticated,
  }
);

export default connect(mapStateToProps, { fetchProjects, deleteProject })(ProjectList);
