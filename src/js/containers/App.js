import React, {
  PropTypes,
} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Header from 'components/2-molecules/Header';
import * as actionCreators from 'actions';
import MessageBar from 'components/2-molecules/MessageBar';
import Footer from 'whippersnapper/build/Footer';
require('zzzss/dist/css/zzzss.css');

// TODO: This feels not quite right. Instead, inject version during build.
import { version } from '../../../package.json';

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
      onLogoClick={() => {
        // Navigate to home screen. Should this be first or last?
        browserHistory.push('/');

        // reset the project in the state tree
        resetProject();

        // reset the message.
        dismissMessage();
      }}
      message={message}
    />
    <MessageBar message={message} />
    {children}
    <Footer
      appVersion={version}
    />
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
