import React, {
  Component,
  PropTypes,
} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/';
import Button from '../1-atoms/Button';
import ProjectsTable from '../2-molecules/ProjectsTable';
import Footer from '../2-molecules/Footer';

class ProjectList extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    if (this.props.isFetching) {
      return <div>Fetching project list...</div>;
    }

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
        <Footer />
      </div>
    );
  }
}

ProjectList.propTypes = {
  fetchProjects: PropTypes.func,
  fetchProject: PropTypes.func,
  onSwitchView: PropTypes.func,
  projectList: PropTypes.array,
  isFetching: PropTypes.bool,
};

const mapStateToProps = state => (
  {
    projectList: state.appData.projectList,
  }
);

export default connect(mapStateToProps, actionCreators)(ProjectList);
