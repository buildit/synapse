import React, {
  Component,
  PropTypes,
} from 'react';
import TableWithButton from './3-organisms/table-with-button';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Main extends Component {
  componentDidMount() {
    this.props.fetchProjectList();
  }

  render() {
    let projects = [{}];
    if (this.props.appData) {
      if (this.props.appData.projectList) {
        projects = this.props.appData.projectList || [{}];
      }
    }

    let result;

    if (this.props.appData.isFetching) {
      result = (
        <div className="index">
          <h1>Synapse</h1>
          <h4>Loading...</h4>
        </div>
      );
    } else {
      result = (
        <div className="index">
          <h1>Synapse</h1>
          <TableWithButton
            buttonText={"New"}
            tableData={projects}
            visibleColumns={[
              'name',
              'portfolio',
              'program',
              'status',
              'description',
            ]}
            rowKey={'id'}
          />
        </div>
      );
    }

    return result;
  }
}

Main.propTypes = {
  appData: PropTypes.object,
  fetchProjectList: PropTypes.func,
};

const mapStateToProps = () => ({});

Main = connect(
  mapStateToProps,
  actions
)(Main);

export default Main;
