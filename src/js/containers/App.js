import React, {
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import ProjectList from '../components/4-ecosystems/ProjectList';
import Project from '../components/4-ecosystems/Project';
import Nav from '../components/2-molecules/Nav';
import { fetchProjectList, fetchProject } from '../actions/index.js';

const App = ({ ui, appData, actions, onSwitchView }) => {
  switch (ui.view) {
  case 'listView': {
    return (
      <div className="container">
        <Nav onSwitchView={onSwitchView} />
        <ProjectList
          actions={actions}
          ui={ui}
          appData={appData}
          fetchProjectList={fetchProjectList}
          fetchProject={fetchProject}
        />
      </div>
    );
  }
  case 'projectView': {
    return (
      <div className="container">
        <Nav onSwitchView={onSwitchView} />
        <Project
          actions={actions}
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
  actions: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  appData: PropTypes.object.isRequired,
  onSwitchView: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  const props = {
    ui: state.ui,
    appData: state.appData,
  };
  return props;
}

const mapDispatchToProps = (dispatch) => (
  {
    onSwitchView: (view) => {
      dispatch({ type: 'SWITCH_VIEW', view });
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
