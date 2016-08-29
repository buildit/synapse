import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/';
import Button from '../1-atoms/Button';
import TableWithAction from '../2-molecules/TableWithAction';

class ProjectList extends Component {
  componentDidMount() {
    console.log('this.props.fetchProjects', this.props.fetchProjects);
    this.props.fetchProjects();
  }

  render() {
    console.log('this.props.projectList', this.props.projectList);
    const onProjectViewClick = id => {
      this.props.fetchProject(id);
    };

    if (this.props.isFetching) {
      return <div>Fetching project list...</div>;
    }
    return (
      <div>
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



    // return (
    //   <div>
    //     <Button
    //       label="New"
    //       onClick={() => {
    //         this.props.onSwitchView('newProjectList');
    //       }}
    //     />
    //     <TableWithAction
    //       tableData={this.props.projects || []}
    //       visibleColumns={[
    //         'name',
    //         'portfolio',
    //         'program',
    //         'status',
    //         'description',
    //       ]}
    //       rowKey={'id'}
    //       onActionClick={onProjectViewClick}
    //       actionLabel="View"
    //     />
    //   </div>
    // );
  }
}

ProjectList.propTypes = {
  fetchProjects: PropTypes.func,
  fetchProject: PropTypes.func,
  onSwitchView: PropTypes.func,
  projectList: PropTypes.array,
  isFetching: PropTypes.bool,
};

const mapStateToProps = state => {
  console.log('state', state);
  return (
    {
      projectList: state.appData.projectList,
    }
  );
}


export default connect(mapStateToProps, actionCreators)(ProjectList);
