import React, { PropTypes } from 'react';
import ProjectList from '../3-organisms/ProjectList';
import NewProjectList from '../3-organisms/NewProjectList';
import Project from '../3-organisms/Project';
import EditProject from '../3-organisms/EditProject';
import Status from '../3-organisms/Status';
import Error from '../1-atoms/Error';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index.js';

const Body = ({
  appData,
  ui,
  view,
  fetchProjects,
  fetchProject,
  saveFormData,
  fetchStarterProjects,
  fetchStatus,
  initializeNewProject,
  onSwitchView,
  onInputChange,
  initializeFormData,
  onListItemRemove,
  addItemToDemandFlowList,
  addItemToDefectFlowList,
  addItemToRoleList,
  addItemToSeverityList,
  moveListItemUp,
  moveListItemDown,
 }) => {
  switch (view) {

  case 'listView': {
    return (
      <ProjectList
        fetchProjects={fetchProjects}
        fetchProject={fetchProject}
        projects={appData.projectList}
        isFetching={appData.isFetching}
        onSwitchView={onSwitchView}
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
        onSwitchView={onSwitchView}
        saveFormData={saveFormData}
        onInputChange={onInputChange}
        initializeFormData={initializeFormData}
        onListItemRemove={onListItemRemove}
        addItemToDemandFlowList={addItemToDemandFlowList}
        addItemToDefectFlowList={addItemToDefectFlowList}
        addItemToRoleList={addItemToRoleList}
        addItemToSeverityList={addItemToSeverityList}
        moveListItemUp={moveListItemUp}
        moveListItemDown={moveListItemDown}
      />);
  }

  case 'newProjectList': {
    return (
      <NewProjectList
        fetchStarterProjects={fetchStarterProjects}
        initializeNewProject={initializeNewProject}
        starterProjects={appData.starterProjectList}
        isFetching={appData.isFetching}
        onSwitchView={onSwitchView}
      />);
  }

  case 'statusView': {
    return (
      <Status
        fetchStatus={fetchStatus}
        projectId={appData.project.id}
        demandStatus={appData.demandStatus}
      />
    );
  }

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
  saveFormData: PropTypes.func.isRequired,
  fetchStarterProjects: PropTypes.func.isRequired,
  fetchStatus: PropTypes.func.isRequired,
  initializeNewProject: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  initializeFormData: PropTypes.func.isRequired,
  onSwitchView: PropTypes.func.isRequired,
  onListItemRemove: PropTypes.func.isRequired,
  addItemToDemandFlowList: PropTypes.func.isRequired,
  addItemToDefectFlowList: PropTypes.func.isRequired,
  addItemToRoleList: PropTypes.func.isRequired,
  addItemToSeverityList: PropTypes.func.isRequired,
  moveListItemUp: PropTypes.func.isRequired,
  moveListItemDown: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // console.log(state);
  const props = {
    ui: state.ui,
    appData: state.appData,
  };
  return props;
}

export default connect(mapStateToProps, actionCreators)(Body);
