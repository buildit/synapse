import React, {
  Component,
  PropTypes,
} from 'react';
import TableWithButton from '../3-organisms/TableWithActionWithButton';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ProjectList extends Component {
  componentDidMount() {
    this.props.fetchProjectList();
  }

  render() {
    const onProjectViewClick = (id) => {
      this.props.fetchProject(id);
    };

    let projects = [{}];
    if (this.props.appData) {
      if (this.props.appData.projectList) {
        projects = this.props.appData.projectList || [{}];
      }
    }

    let result;

    if (this.props.ui.errorMessage) {
      result = (
        <div>
          <h1>Synapse</h1>
          <p>{this.props.ui.errorMessage}</p>
        </div>
      );
    } else if (this.props.appData.isFetching) {
      result = (
        <div className="index">
          <h1>Synapse</h1>
          <h4>Loading...</h4>
        </div>
      );
    } else {
      result = (
        <div className="index">
          <h1>Synapse</h1>
          <TableWithButton
            buttonText={"New"}
            tableData={projects}
            visibleColumns={[
              'name',
              'portfolio',
              'program',
              'status',
              'description',
            ]}
            rowKey={'id'}
            onProjectViewClick={onProjectViewClick}
          />
        </div>
      );
    }

    return result;
  }
}

ProjectList.propTypes = {
  appData: PropTypes.object,
  ui: PropTypes.object,
  fetchProjectList: PropTypes.func,
  fetchProject: PropTypes.func,
};

const mapStateToProps = () => ({});

ProjectList = connect(
  mapStateToProps,
  actions
)(ProjectList);

export default ProjectList;
