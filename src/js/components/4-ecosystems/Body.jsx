import React, { PropTypes } from 'react';
import ProjectList from '../3-organisms/ProjectList';
import Project from '../3-organisms/Project';
import EditProject from '../3-organisms/EditProject';
import Error from '../1-atoms/Error';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index.js';

const Body = ({
  appData,
  ui,
  view,
  fetchProjects,
  fetchProject,
  onSwitchView,
  onInputChange,
  initializeFormData,
  onListItemRemove,
  addItemToList,
 }) => {
  switch (view) {

  case 'listView': {
    return (
      <ProjectList
        fetchProjects={fetchProjects}
        fetchProject={fetchProject}
        projects={appData.projectList}
        isFetching={appData.isFetching}
      />);
  }

  case 'projectView': {
    return (
      <Project
        project={appData.project}
        onSwitchView={onSwitchView}
      />
  );
  }

  case 'editProject': {
    return (
      <EditProject
        project={appData.project}
        onInputChange={onInputChange}
        initializeFormData={initializeFormData}
        onListItemRemove={onListItemRemove}
        addItemToList={addItemToList}
      />);
  }

  case 'newProjectList': { return <div>New project list</div>; }

  case 'error': { return <Error message={ui.errorMessage} />; }

  default: return <div>Nothing.</div>;
  }
};

Body.propTypes = {
  view: PropTypes.string.isRequired,
  appData: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchProject: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  initializeFormData: PropTypes.func.isRequired,
  onSwitchView: PropTypes.func.isRequired,
  onListItemRemove: PropTypes.func.isRequired,
  addItemToList: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const props = {
    ui: state.ui,
    appData: state.appData,
  };
  return props;
}

export default connect(mapStateToProps, actionCreators)(Body);
