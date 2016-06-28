import React, {
  Component,
  PropTypes,
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';

class App extends Component {
  render() {
    const { actions, view, appData } = this.props;
    return (<Main
      actions={actions}
      view={view}
      appData={appData}
    />);
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  appData: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  // console.log(state);
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
