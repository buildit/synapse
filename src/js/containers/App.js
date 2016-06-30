import React, {
  PropTypes,
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectList from '../components/4-ecosystems/ProjectList';
import Project from '../components/4-ecosystems/Project';
import { fetchProjectList, fetchProject } from '../actions/index.js';

const App = ({ actions, ui, appData }) => {
  switch (ui.view) {
  case 'listView': {
    return (
      <ProjectList
        actions={actions}
        ui={ui}
        appData={appData}
        fetchProjectList={fetchProjectList}
        fetchProject={fetchProject}
      />
    );
  }
  case 'projectView': {
    return <Project project={appData.project} />;
  }
  default: {
    return <p>Uh oh.</p>;
  }
  }
};

App.propTypes = {
  actions: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  appData: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  const props = {
    ui: state.ui,
    appData: state.appData,
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
