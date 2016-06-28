import React from 'react';
import TableWithButton from './3-organisms/table-with-button';
import $ from 'jquery';
import { connect } from 'react-redux';

let AppComponent = ({ dispatch, appData }) => {
  $.get('http://localhost:6565/project')
    .done(data => {
      // dispatch action to update data on state
      dispatch({
        type: 'UPDATE_PROJECT_LIST',
        projectList: data,
      });
    });

  let projects = [{}];
  if (appData) {
    projects = appData.projectList || [{}];
  }

  return (
    <div className="index">
      <h1>Synapse</h1>
      <TableWithButton buttonText={"New"} tableData={projects} />
    </div>
  );
};

AppComponent.propTypes = {
  dispatch: React.propTypes.func,
  appData: React.propTypes.array,
};

AppComponent = connect()(AppComponent);

export default AppComponent;
