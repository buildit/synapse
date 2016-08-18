import React, { PropTypes } from 'react';
import ProjectList from '../3-organisms/ProjectList';
import NewProjectList from '../3-organisms/NewProjectList';
import Project from '../3-organisms/Project';
import EditProject from '../3-organisms/EditProject';
import Status from '../3-organisms/Status';
import Projection from '../3-organisms/Projection';
import Error from '../1-atoms/Error';
import SaveConfirmationModal from '../2-molecules/SaveConfirmationModal';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index.js';
const filterListByIds = require('../../helpers/filterListByIds');

const Body = ({
  appData,
  ui,
  view,
  fetchProjects,
  fetchProject,
  saveFormData,
  fetchStarterProjects,
  fetchStatus,
  fetchProjection,
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
  resetProject,
  projection,
  project,
  projectList,
  starterProjectList,
  isNewProject,
  setIsNewProject,
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
        setIsNewProject={setIsNewProject}
      />
  );
  }

  case 'editProject': {
    return (
      <EditProject
        project={project}
        goHome={() => {
          onSwitchView('listView');
          resetProject();
        }}
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
        isNewProject={isNewProject}
      />);
  }

  case 'newProjectList': {
    return (
      <NewProjectList
        fetchStarterProjects={fetchStarterProjects}
        initializeNewProject={initializeNewProject}
        starterProjects={starterProjectList}
        isFetching={appData.isFetching}
        onSwitchView={onSwitchView}
        projectList={projectList}
        goHome={() => {
          onSwitchView('listView');
          resetProject();
        }}
        setIsNewProject={setIsNewProject}
      />);
  }

  case 'statusView': {
    return (
      <Status
        fetchStatus={fetchStatus}
        fetchProjection={fetchProjection}
        projectId={appData.project.id}
        projectName={appData.project.name}
        project={appData.project}
        projection={projection}
        demandStatus={appData.demandStatus}
        defectStatus={appData.defectStatus}
        effortStatus={appData.effortStatus}
      />
    );
  }

  case 'projectionView': {
    return (
      <Projection
        projectName={appData.project.name}
      />
    );
  }

  case 'error': { return <Error message={ui.errorMessage} />; }

  case 'modalView': {
    return (
      <SaveConfirmationModal
        goHome={() => {
          onSwitchView('listView');
          resetProject();
        }}
      />)
        ;
  }

  default: return <div></div>;
  }
};

Body.propTypes = {
  view: PropTypes.string.isRequired,
  appData: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  projection: PropTypes.object.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchProject: PropTypes.func.isRequired,
  saveFormData: PropTypes.func.isRequired,
  fetchStarterProjects: PropTypes.func.isRequired,
  fetchStatus: PropTypes.func.isRequired,
  fetchProjection: PropTypes.func.isRequired,
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
  resetProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  projectList: PropTypes.array.isRequired,
  starterProjectList: PropTypes.array.isRequired,
  isNewProject: PropTypes.bool.isRequired,
  setIsNewProject: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // Normalize api data before sending to components
  const project = state.appData.project;
  if (project) {
    project.id = project.id ? project.id.toString() : '';
  }
  const projectList = state.appData.projectList.map(_project => {
    const normalizedProject = _project;
    normalizedProject.id = _project.id.toString();
    return normalizedProject;
  });
  let starterProjectList = state.appData.starterProjectList.map(_project => {
    const normalizedProject = _project;
    normalizedProject.id = _project.id.toString();
    return normalizedProject;
  });

  const existingProjectListIds = projectList.map(_project => _project.id);

  starterProjectList = filterListByIds(starterProjectList, existingProjectListIds);

  starterProjectList = starterProjectList.filter(_project => _project.status === 'Active');

  const props = {
    ui: state.ui,
    appData: state.appData,
    projection: state.projection,
    project,
    projectList,
    starterProjectList,
    isNewProject: state.isNewProject,
  };
  return props;
}

export default connect(mapStateToProps, actionCreators)(Body);
