import React, {
  Component,
  PropTypes,
} from 'react';
import TableWithButton from './3-organisms/table-with-button';
import { connect } from 'react-redux';
import * as actions from '../actions';
import getProjectListReducer from '../reducers/admin/getProjectList';

class Main extends Component {
  componentDidMount() {
    this.props.fetchProjectList();
  }

  render() {
    let projects = [{}];
    if (this.props.appData) {
      if (this.props.appData.projectList) {
        projects = this.props.appData.projectList.map(project => (
          {
            name: project.name,
            status: project.status,
            portfolio: project.portfolio,
            program: project.program,
            description: project.description,
          }
        ));
      }
    }

    return (
      <div className="index">
        <h1>Synapse</h1>
        <TableWithButton buttonText={"New"} tableData={projects} />
      </div>
    );
  }
}

Main.propTypes = {
  appData: PropTypes.object,
  fetchProjectList: PropTypes.func,
};

const mapStateToProps = (state) => ({
  projectList: getProjectListReducer(state, 'placeholder filter'),
});

Main = connect(
  mapStateToProps,
  actions
)(Main);

export default Main;
