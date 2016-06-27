import React, {
  Component,
  PropTypes,
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';

class App extends Component {
  render() {
    const { actions, view } = this.props;
    return <Main actions={actions} view={view} />;
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  const props = {
    view: state.view,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
