import React, {
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
// import ProjectList from '../components/4-ecosystems/ProjectList';
// import Project from '../components/4-ecosystems/Project';
import Body from '../components/4-ecosystems/Body';
import Nav from '../components/2-molecules/Nav';
import * as actionCreators from '../actions/index.js';
import navLinks from '../../nav.config.js';

const App = ({ ui, onSwitchView, fetchProject, fetchProjects, fetchStatus }) => (
  <div className="container">
    <Nav
      onSwitchView={onSwitchView}
      links={navLinks}
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
  console.log(state);
  const props = {
    ui: state.ui,
    appData: state.appData,
  };
  return props;
}

export default connect(mapStateToProps, actionCreators)(App);
