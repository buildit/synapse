import React, {
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import Body from '../components/4-ecosystems/Body';
import Header from '../components/2-molecules/Header';
import * as actionCreators from '../actions/index.js';

const App = ({
  ui,
  onSwitchView,
  resetProject,
  dismissMessage,
  fetchProject,
  fetchProjects,
  fetchStatus,
  projectName }) => (
  <div className="container">
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
      view={ui.view}
      fetchProject={fetchProject}
      fetchProjects={fetchProjects}
      fetchStatus={fetchStatus}
    />
  </div>
);

App.propTypes = {
  ui: PropTypes.object.isRequired,
  appData: PropTypes.object.isRequired,
  onSwitchView: PropTypes.func.isRequired,
  fetchProject: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchStatus: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const projectName = state.appData.project ? state.appData.project.name : '';
  console.log(state);
  const props = {
    ui: state.ui,
    appData: state.appData,
    projectName,
  };
  return props;
}

export default connect(mapStateToProps, actionCreators)(App);
