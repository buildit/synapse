import React, {
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import Body from '../components/4-ecosystems/Body';
import Header from '../components/2-molecules/Header';
import * as actionCreators from '../actions/index.js';
import ProjectLink from '../components/1-atoms/ProjectLink';

const App = ({
  params,
  ui,
  onSwitchView,
  fetchProject,
  fetchProjects,
  fetchStatus,
  resetProject,
  dismissMessage,
  projectName }) => {
  return (
  <div className="container">
    <ProjectLink id="something">Click me</ProjectLink>
    <Header
      projectName={projectName}
      goHome={() => {
        onSwitchView('listView');
        resetProject();
      }}
      message={ui.message}
      dismissMessage={dismissMessage}
    />
    <Body
      projectId={params.projectId || ''}
      view={ui.view}
      fetchProject={fetchProject}
      fetchProjects={fetchProjects}
      fetchStatus={fetchStatus}
    />
  </div>
)};

App.propTypes = {
  ui: PropTypes.object.isRequired,
  appData: PropTypes.object.isRequired,
  onSwitchView: PropTypes.func.isRequired,
  fetchProject: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchStatus: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired,
  dismissMessage: PropTypes.func.isRequired,
  projectName: PropTypes.string,
  updateProject: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const projectName = state.appData.project ? state.appData.project.name : '';
  const props = {
    ui: state.ui,
    appData: state.appData,
    projectName,
  };
  return props;
}

export default connect(mapStateToProps, actionCreators)(App);
