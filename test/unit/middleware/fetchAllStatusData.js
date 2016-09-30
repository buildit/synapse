import Api from '../../../src/js/api';
import * as actions from '../../../src/js/actions/actions';
import { fetchAllStatusData } from '../../../src/js/middleware/project';
const expect = require('chai').expect;

describe('All status for project fetcher', () => {
  const name = 'Foo';
  const generator = fetchAllStatusData({name: name});

  it('retrieves data', () => {
    const xhrCorrect = [
      { '@@redux-saga/IO': true,
        CALL:
          { context: null,
            fn: Api.projectDemandSummary,
            args: [ name ] }
      },
      { '@@redux-saga/IO': true,
        CALL:
         { context: null,
           fn: Api.projectDefectSummary,
           args: [ name ] }
      },
      { '@@redux-saga/IO': true,
        CALL:
        { context: null,
          fn: Api.projectEffortSummary,
          args: [ name ] }
      },
      { '@@redux-saga/IO': true,
        CALL:
        { context: null,
          fn: Api.project,
          args: [ name ] }
      }
    ];
    expect(generator.next().value).to.deep.equal(xhrCorrect);
  });

  it('indicates that the fetch was successful', () => {
    const demand = { this: 'that' };
    const defect = { near: 'far' };
    const effort = { we: 'they' };
    const project = { project: 'Yes, this is a project' };

    const statusSuccessCorrect = {
      '@@redux-saga/IO': true,
      PUT:
        { channel: null,
          action: { type: 'FETCH_STATUS_SUCCESS', status: { demand, defect, effort } }
        }
    };
    const projectSuccessCorrect = {
      '@@redux-saga/IO': true,
      PUT:
        { channel: null,
          action: { type: 'FETCH_PROJECT_SUCCESS', project: project }
        }
    };
    expect(generator.next([demand, defect, effort, project]).value).to.deep.equal(statusSuccessCorrect);
    expect(generator.next().value).to.deep.equal(projectSuccessCorrect);
  });

  it('is done', () => {
    expect(generator.next().done).to.equal(true);
  });

  it('handles exceptions properly', () => {
    const errorGenerator = fetchAllStatusData({name: name});
    const errorMessage = 'foo';

    // Step to the first yield, so that we're inside the error catcher.
    errorGenerator.next();

    const errorCorrect = {
      '@@redux-saga/IO': true,
      PUT: { channel: null, action: { type: 'DER_WHAT_DE_HEY', errorMessage: errorMessage } }
    }

    expect(errorGenerator.throw(errorMessage).value).to.deep.equal(errorCorrect);
  });

});
