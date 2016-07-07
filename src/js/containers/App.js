import React, {
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import ProjectList from '../components/4-ecosystems/ProjectList';
import Project from '../components/4-ecosystems/Project';
import Nav from '../components/2-molecules/Nav';
import * as actionCreators from '../actions/index.js';
import navLinks from '../../nav.config.js';

const App = ({ ui, appData, onSwitchView, fetchProject, fetchProjects }) => {
  switch (ui.view) {
  case 'listView': {
    return (
      <div className="container">
        <Nav
          onSwitchView={onSwitchView}
          links={navLinks}
          currentLink="List view"
        />
        <ProjectList
          ui={ui}
          appData={appData}
          fetchProjects={fetchProjects}
          fetchProject={fetchProject}
        />
      </div>
    );
  }
  case 'projectView': {
    return (
      <div className="container">
        <Nav
          onSwitchView={onSwitchView}
          links={navLinks}
          currentLink="Project view"
        />
        <Project
          project={appData.project}
        />
      </div>
  );
  }
  default: {
    return <p>Uh oh.</p>;
  }
  }
};

App.propTypes = {
  ui: PropTypes.object.isRequired,
  appData: PropTypes.object.isRequired,
  onSwitchView: PropTypes.func.isRequired,
  fetchProject: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  const props = {
    ui: state.ui,
    appData: state.appData,
  };
  return props;
}

export default connect(mapStateToProps, actionCreators)(App);
