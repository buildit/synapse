import Api from '../../../src/js/api';
import * as actions from '../../../src/js/actions/actions';
import { fetchAllStatusData } from '../../../src/js/middleware/project';
const expect = require('chai').expect;

describe('All status for project fetcher', () => {
  const generator = fetchAllStatusData({name: 'Foo'});

  var value;
  while (value = generator.next().value) {
    console.log(value);
  }
  // it('retrieves data', () => {
  //   const xhrCorrect = [
  //     { '@@redux-saga/IO': true,
  //       CALL:
  //         { context: null,
  //           fn: Api.projectDemandSummary,
  //           args: [Object] }
  //     },
  //     { '@@redux-saga/IO': true,
  //       CALL:
  //        { context: null,
  //          fn: Api.projectDefectSummary,
  //          args: [Object] }
  //     },
  //     { '@@redux-saga/IO': true,
  //       CALL:
  //       { context: null,
  //         fn: Api.projectEffortSummary,
  //         args: [Object] }
  //     },
  //     { '@@redux-saga/IO': true,
  //       CALL:
  //       { context: null,
  //         fn: Api.project,
  //         args: [Object] }
  //     }
  //   ];
    // expect(generator.next().value).to.deep.equal(xhrCorrect);
  // });
  //
  // it('issues an action', () => {
  //   const actionCorrect = {
  //     '@@redux-saga/IO': true,
  //     PUT: {
  //       channel: null,
  //       action: { type: actions.FETCH_PROJECTS_RECEIVE, response: undefined }
  //     }
  //   };
  //   expect(generator.next().value).to.deep.equal(actionCorrect);
  // });
});
