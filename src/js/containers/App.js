import React, {
  PropTypes,
} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/2-molecules/Header';
import * as actionCreators from '../actions/index.js';

const App = ({
  message,
  resetProject,
  dismissMessage,
  projectName,
  children,
 }) => (
  <div className="container">
    <Header
      projectName={projectName}
      goHome={() => {
        browserHistory.push('/');
        resetProject();
      }}
      message={message}
      dismissMessage={dismissMessage}
    />
    {children}
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
  resetProject: PropTypes.func.isRequired,
  dismissMessage: PropTypes.func.isRequired,
  projectName: PropTypes.string,
  updateProject: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const projectName = state.appData.project ? state.appData.project.name : '';
  return {
    message: state.ui.message,
    appData: state.appData,
    projectName,
  };
}

export default connect(mapStateToProps, actionCreators)(App);
