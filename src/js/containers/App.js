import React, {
  PropTypes,
} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';
import MessageBar from 'components/2-molecules/MessageBar';
import Header from 'whippersnapper/build/Header';
import Footer from 'whippersnapper/build/Footer';
require('zzzss/dist/css/zzzss.css');

const version = process.env.VERSION;

const App = ({
  message,
  resetProject,
  dismissMessage,
  projectName,
  children,
 }) => (
  <div className="container">
    <Header
      logotype="Synapse"
      pageName={projectName}
      onLogoClick={() => {
        // Navigate to home screen. Should this be first or last?
        browserHistory.push('/');

        // reset the project in the state tree
        resetProject();

        // reset the message.
        dismissMessage();
      }}
    />
    <MessageBar message={message} />
    {children}
    <Footer
      appVersion={version}
    />
  </div>
);

App.propTypes = {
  message: PropTypes.object.isRequired,
  resetProject: PropTypes.func.isRequired,
  dismissMessage: PropTypes.func.isRequired,
  projectName: PropTypes.string,
  updateProject: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const projectName = state.project ? state.project.name : '';
  return {
    message: state.messages,
    appData: state.appData,
    projectName,
  };
}

export default connect(mapStateToProps, actionCreators)(App);
