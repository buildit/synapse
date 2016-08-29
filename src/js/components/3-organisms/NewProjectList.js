import React, {
  Component,
  PropTypes,
} from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/';
import Button from '../1-atoms/Button';
import TableWithAction from '../2-molecules/TableWithAction';

class NewProjectList extends Component {
  componentDidMount() {
    this.props.fetchStarterProjects();
  }

  render() {
    const { starterProjects, setIsNewProject } = this.props;

    const onProjectCreateClick = (harvestId) => {
      this.props.initializeNewProject(harvestId);
      setIsNewProject(true);
      if (harvestId) {
        browserHistory.push(`${harvestId}/edit`);
      } else {
        browserHistory.push('new-project/edit');
      }
    };

    if (this.props.isFetching) {
      return <div>Fetching starter projects list...</div>;
    }

    return (
      <div>
        <Button
          label="Create manually"
          onClick={() => {
            onProjectCreateClick(null);
          }
          }
        />
        <Button
          label="Cancel"
          onClick={() => {
            browserHistory.push('/');
          }}
        />
        <TableWithAction
          tableData={starterProjects || []}
          visibleColumns={[
            'name',
            'portfolio',
            'program',
            'status',
            'description',
          ]}
          rowKey={'id'}
          onActionClick={onProjectCreateClick}
          actionLabel="Create"
        />
      </div>
    );
  }
}

NewProjectList.propTypes = {
  fetchStarterProjects: PropTypes.func,
  onSwitchView: PropTypes.func,
  initializeNewProject: PropTypes.func,
  starterProjects: PropTypes.array,
  isFetching: PropTypes.bool,
  setIsNewProject: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    starterProjects: state.appData.starterProjectList,
  }
);

export default connect(mapStateToProps, actionCreators)(NewProjectList);
