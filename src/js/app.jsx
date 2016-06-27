import React from 'react';
import { render } from 'react-dom';
import TableWithButton from './components/3-organisms/table-with-button';

const tableValues = [
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

render(
  <TableWithButton buttonText={"Click me"} tableData={tableValues} />,
    document.getElementById('app')
);
