import React, {
  Component,
  PropTypes,
} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchProjects } from 'actions/projects';
import Button from 'components/1-atoms/Button';
import Spinner from 'components/1-atoms/Spinner';
import ProjectsTable from 'components/2-molecules/ProjectsTable';

class ProjectList extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    if (this.props.xhr) return <Spinner />;

    return (
      <div>
        <Button
          label="New"
          cssClasses="button btn btn-primary"
          onClick={() => {
            browserHistory.push('/new');
          }}
        />
        <ProjectsTable
          tableData={this.props.projectList || []}
          visibleColumns={[
            'name',
            'portfolio',
            'program',
            'status',
            'description',
          ]}
          rowKey={'name'}
        />
      </div>
    );
  }
}

ProjectList.propTypes = {
  fetchProjects: PropTypes.func,
  fetchProject: PropTypes.func,
  projectList: PropTypes.array,
  xhr: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    projectList: state.projects.projectList,
    xhr: state.xhr,
  }
);

export default connect(mapStateToProps, { fetchProjects })(ProjectList);
