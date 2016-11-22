import getRagStatus from 'helpers/getRagStatus';
import * as ragStatus from 'helpers/ragStatusConstants';

import { expect } from 'chai';

describe('getRagStatus', () => {
  const projection = {
    backlogSize: 25,
    darkMatterPercentage: 50,
    endIterations: 3,
    endVelocity: 5,
    iterationLength: 2,
    startDate: '2016-07-01',
    startIterations: 3,
    startVelocity: 5,
    targetVelocity: 20,
  };
  const greenDemand = [{
    projectDate: '2016/07/11',
    status: { Backlog: 170, 'Selected for Development': 7, 'In Progress': 2, Done: 1000 },
  }];
  const redDemand = [{
    projectDate: '2016/08/11',
    status: { Backlog: 170, 'Selected for Development': 7, 'In Progress': 3 },
  }, {
    projectDate: '2016/08/12',
    status: { Backlog: 170, 'Selected for Development': 7, 'In Progress': 200, Done: 1 },
  }];

  it('deals with bad data', () => {
    expect(getRagStatus()).to.equal(undefined);
  });

  it('calculates green status properly', () => {
    expect(getRagStatus(projection, greenDemand)).to.equal(ragStatus.GREEN);
  });
  it('calculates red status properly', () => {
    expect(getRagStatus(projection, redDemand)).to.equal(ragStatus.RED);
  });
  it('changes the red status with a different done key', () => {
    expect(getRagStatus(projection, redDemand, 'In Progress')).to.equal(ragStatus.GREEN);
  });
  it('is undefined with incomplete data', () => {
    expect(getRagStatus(projection, redDemand, 'Foo')).to.equal(undefined);
  });
});
