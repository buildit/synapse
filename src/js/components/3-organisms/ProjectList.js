import React, {
  Component,
  PropTypes,
} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/';
import Button from '../1-atoms/Button';
import TableWithAction from '../2-molecules/TableWithAction';

class ProjectList extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const onProjectViewClick = projectId => {
      this.props.fetchProject(projectId);
      browserHistory.push(`/${projectId}`);
    };

    if (this.props.isFetching) {
      return <div>Fetching project list...</div>;
    }
    return (
      <div>
        <Button
          label="New"
          onClick={() => {
            browserHistory.push('/new');
          }}
        />
        <TableWithAction
          tableData={this.props.projectList || []}
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
  projectList: PropTypes.array,
  isFetching: PropTypes.bool,
};

const mapStateToProps = state => (
  {
    projectList: state.appData.projectList,
  }
);

export default connect(mapStateToProps, actionCreators)(ProjectList);
