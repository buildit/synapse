jest.unmock('../src/js/components/2-molecules/Table');
jest.unmock('../src/js/components/1-atoms/TableCell');
jest.unmock('../src/js/components/1-atoms/TableHeaderCell');

import React from 'react';
import { mount } from 'enzyme';
import Table from '../src/js/components/2-molecules/Table';

describe('Table', () => {
  let tableData;
  let visibleColumns;
  let rowKey;
  beforeEach(() => {
    tableData = [
      {
        portfolio: 'Remarkable',
        id: 'P001',
        status: 'Active',
        name: 'CitiPlanner',
        program: 'CitiGold',
        description: 'Reimagine application used by financial planners',
      },
      {
        portfolio: 'HSBC',
        id: 'P002',
        status: 'Active',
        name: 'CD CI Phase 1',
        program: 'HSBC CI/CD',
        description: 'Buil CI/CD Pipeline for HSBC',
      },
      {
        portfolio: 'HSBC',
        id: 'P006',
        status: 'Active',
        name: 'CD CI Phase 2',
        program: 'HSBC CI/CD',
        description: 'Buil CI/CD Pipeline for HSBC',
      },
    ];

    visibleColumns = ['id', 'name'];

    rowKey = 'id';
  });

  it('creates the correct number of rows', () => {
    const wrapper = mount(
      <Table
        tableData={tableData}
        visibleColumns={visibleColumns}
        rowKey={rowKey}
      />
    );
    expect(wrapper.find('tr').length).toEqual(4);
  });

  it('has the same number of columns in table as visible columns', () => {
    const wrapper = mount(
      <Table
        tableData={tableData}
        visibleColumns={visibleColumns}
        rowKey={rowKey}
      />
    );

    expect(wrapper.find({ id: 'row-P001' }).find('td').length).toEqual(2);
  });

  it('row id value matches the value corresponding to the rowKey', () => {
    rowKey = 'name';

    const wrapper = mount(
      <Table
        tableData={tableData}
        visibleColumns={visibleColumns}
        rowKey={rowKey}
      />
    );

    expect(wrapper.find({ id: 'row-CitiPlanner' }).length).toEqual(1);
  });
});
