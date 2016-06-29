import React, {
  PropTypes,
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
import fetchProjectList from '../actions/index.js';

const App = ({ actions, view, appData }) => (
  <Main
    actions={actions}
    view={view}
    appData={appData}
    fetchProjectList={fetchProjectList}
  />
);

App.propTypes = {
  actions: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
  appData: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  const props = {
    view: state.view,
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
