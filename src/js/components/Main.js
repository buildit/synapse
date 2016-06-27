import React from 'react';
import TableWithButton from './3-organisms/table-with-button';

export default class AppComponent extends React.Component {
  render() {
    const fakeData = [
      { portfolio: 'Remarkable', id: 'P001', status: 'Active', name: 'CitiPlanner',
        description: 'Reimagine application used by financial planners',
        program: 'CitiGold' },
      { portfolio: 'HSBC',
        id: 'P002',
        status: 'Active',
        name: 'CD CI Phase 1',
        program: 'HSBC CI/CD',
        description: 'Buil CI/CD Pipeline for HSBC' },
    ];

    const projects = fakeData.map(project => ({
      id: project.id,
      name: project.name,
      portfolio: project.portfolio,
      status: project.status,
    }));

    return (
      <div className="index">
        <h1>Synapse</h1>
        <TableWithButton buttonText={"New"} tableData={projects} />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};
