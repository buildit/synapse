const expect = require('chai').expect;
/* eslint-disable import/no-unresolved */
import * as actions from '/actions/actions';
import * as functions from '/actions';
import * as statusFunctions from '/actions/fetchAllStatusData';
import * as projectFunctions from '/actions/fetchProjects';
/* eslint-enable import/no-unresolved */

describe('Redux actions', () => {
  it('receiveProjects', () => {
    const response = 'test';
    const correct = {
      type: actions.FETCH_PROJECTS_RECEIVE,
      response,
    };
    expect(functions.receiveProjects(response)).to.deep.equal(correct);
  });

  it('receiveStarterProjects', () => {
    const response = 'test';
    const correct = {
      type: actions.FETCH_STARTER_PROJECTS_RECEIVE,
      response,
    };
    expect(functions.receiveStarterProjects(response)).to.deep.equal(correct);
  });

  it('setErrorMessage', () => {
    const message = 'test';
    const correct = {
      type: actions.SET_ERROR_MESSAGE,
      message,
    };
    expect(functions.setErrorMessage(message)).to.deep.equal(correct);
  });

  it('onSwitchView', () => {
    const view = 'test';
    const correct = {
      type: actions.SWITCH_VIEW,
      view,
    };
    expect(functions.onSwitchView(view)).to.deep.equal(correct);
  });

  it('showModal', () => {
    const modal = 'test';
    const project = 'test 2';
    const correct = {
      type: actions.SHOW_MODAL,
      modal,
      project,
    };
    expect(functions.showModal(modal, project)).to.deep.equal(correct);
  });

  it('hideModal', () => {
    const modal = 'test';
    const correct = {
      type: actions.HIDE_MODAL,
      modal,
    };
    expect(functions.hideModal(modal)).to.deep.equal(correct);
  });

  it('fetchProjects', () => {
    const correct = {
      type: actions.FETCH_PROJECTS,
    };
    expect(functions.fetchProjects()).to.deep.equal(correct);
  });

  it('fetchStarterProjects', () => {
    const correct = {
      type: actions.FETCH_STARTER_PROJECTS_REQUEST,
    };
    expect(functions.fetchStarterProjects()).to.deep.equal(correct);
  });

  it('fetchProject', () => {
    const name = 'test';
    const correct = {
      type: actions.FETCH_PROJECT_REQUEST,
      name,
    };
    expect(functions.fetchProject(name)).to.deep.equal(correct);
  });

  it('saveFormData', () => {
    const project = 'test';
    const correct = {
      type: actions.SAVE_PROJECT_REQUEST,
      project,
    };
    expect(functions.saveFormData(project)).to.deep.equal(correct);
  });

  it('initializeNewProject', () => {
    const harvestId = 'test';
    const correct = {
      type: actions.INITIALIZE_NEW_PROJECT,
      harvestId,
    };
    expect(functions.initializeNewProject(harvestId)).to.deep.equal(correct);
  });

  it('onInputChange', () => {
    const section = 'test';
    const key = 'test 2';
    const value = 'test 3';
    const correct = {
      type: actions.UPDATE_FORM_DATA,
      section,
      key,
      value,
    };
    expect(functions.onInputChange(section, key, value)).to.deep.equal(correct);
  });

  it('initializeFormData', () => {
    const project = 'test';
    const correct = {
      type: actions.INITIALIZE_FORM_DATA,
      project,
    };
    expect(functions.initializeFormData(project)).to.deep.equal(correct);
  });

  it('onListItemRemove', () => {
    const section = 'test';
    const list = 'test 2';
    const index = 'test 3';
    const correct = {
      type: actions.REMOVE_LIST_ITEM,
      section,
      list,
      index,
    };
    expect(functions.onListItemRemove(section, list, index)).to.deep.equal(correct);
  });

  it('addItemToDemandFlowList', () => {
    const name = 'test';
    const correct = {
      type: actions.ADD_DEMAND_FLOW_LIST_ITEM,
      name,
    };
    expect(functions.addItemToDemandFlowList(name)).to.deep.equal(correct);
  });

  it('addItemToDefectFlowList', () => {
    const name = 'test';
    const correct = {
      type: actions.ADD_DEFECT_FLOW_LIST_ITEM,
      name,
    };
    expect(functions.addItemToDefectFlowList(name)).to.deep.equal(correct);
  });

  it('addItemToRoleList', () => {
    const name = 'test';
    const groupWith = 'test 2';
    const correct = {
      type: actions.ADD_ROLE_LIST_ITEM,
      name,
      groupWith,
    };
    expect(functions.addItemToRoleList(name, groupWith)).to.deep.equal(correct);
  });

  it('addItemToSeverityList', () => {
    const name = 'test';
    const groupWith = 'test 2';
    const correct = {
      type: actions.ADD_SEVERITY_LIST_ITEM,
      name,
      groupWith,
    };
    expect(functions.addItemToSeverityList(name, groupWith)).to.deep.equal(correct);
  });

  it('moveListItemUp', () => {
    const section = 'test';
    const list = 'test 2';
    const index = 'test 3';
    const correct = {
      type: actions.MOVE_LIST_ITEM_UP,
      section,
      list,
      index,
    };
    expect(functions.moveListItemUp(section, list, index)).to.deep.equal(correct);
  });

  it('moveListItemDown', () => {
    const section = 'test';
    const list = 'test 2';
    const index = 'test 3';
    const correct = {
      type: actions.MOVE_LIST_ITEM_DOWN,
      section,
      list,
      index,
    };
    expect(functions.moveListItemDown(section, list, index)).to.deep.equal(correct);
  });

  it('updateProjectionVelocityStart', () => {
    const value = 'test';
    const correct = {
      type: actions.UPDATE_PROJECTION_VELOCITY_START,
      value,
    };
    expect(functions.updateProjectionVelocityStart(value)).to.deep.equal(correct);
  });

  it('updateProjectionVelocityMiddle', () => {
    const value = 'test';
    const correct = {
      type: actions.UPDATE_PROJECTION_VELOCITY_MIDDLE,
      value,
    };
    expect(functions.updateProjectionVelocityMiddle(value)).to.deep.equal(correct);
  });

  it('updateProjectionVelocityEnd', () => {
    const value = 'test';
    const correct = {
      type: actions.UPDATE_PROJECTION_VELOCITY_END,
      value,
    };
    expect(functions.updateProjectionVelocityEnd(value)).to.deep.equal(correct);
  });

  it('updateProjectionPeriodStart', () => {
    const value = 'test';
    const correct = {
      type: actions.UPDATE_PROJECTION_PERIOD_START,
      value,
    };
    expect(functions.updateProjectionPeriodStart(value)).to.deep.equal(correct);
  });

  it('updateProjectionPeriodEnd', () => {
    const value = 'test';
    const correct = {
      type: actions.UPDATE_PROJECTION_PERIOD_END,
      value,
    };
    expect(functions.updateProjectionPeriodEnd(value)).to.deep.equal(correct);
  });

  it('updateProjectionBacklogSize', () => {
    const value = 'test';
    const correct = {
      type: actions.UPDATE_PROJECTION_BACKLOG_SIZE,
      value,
    };
    expect(functions.updateProjectionBacklogSize(value)).to.deep.equal(correct);
  });

  it('updateProjectionDarkMatter', () => {
    const value = 'test';
    const correct = {
      type: actions.UPDATE_PROJECTION_DARK_MATTER,
      value,
    };
    expect(functions.updateProjectionDarkMatter(value)).to.deep.equal(correct);
  });

  it('updateProjectionIterationLength', () => {
    const value = 'test';
    const correct = {
      type: actions.UPDATE_PROJECTION_ITERATION_LENGTH,
      value,
    };
    expect(functions.updateProjectionIterationLength(value)).to.deep.equal(correct);
  });

  it('updateProjectionStartDate', () => {
    const value = 'test';
    const correct = {
      type: actions.UPDATE_PROJECTION_START_DATE,
      value,
    };
    expect(functions.updateProjectionStartDate(value)).to.deep.equal(correct);
  });

  it('setDoesNotHaveProjection', () => {
    const value = false;
    const correct = {
      type: actions.SET_HAS_PROJECTION,
      value,
    };
    expect(functions.setDoesNotHaveProjection(value)).to.deep.equal(correct);
  });

  it('setMessage', () => {
    const message = 'test';
    const correct = {
      type: actions.SET_MESSAGE,
      message,
    };
    expect(functions.setMessage(message)).to.deep.equal(correct);
  });

  it('clearMessage', () => {
    const message = '';
    const correct = {
      type: actions.SET_MESSAGE,
      message,
    };
    expect(functions.clearMessage(message)).to.deep.equal(correct);
  });

  it('fetchProjection', () => {
    const name = 'test';
    const correct = {
      type: actions.FETCH_PROJECTION_REQUEST,
      name,
    };
    expect(functions.fetchProjection(name)).to.deep.equal(correct);
  });

  it('fetchProjectionSuccess', () => {
    const project = 'test';
    const correct = {
      type: actions.FETCH_PROJECTION_SUCCESS,
      project,
    };
    expect(functions.fetchProjectionSuccess(project)).to.deep.equal(correct);
  });

  it('fetchProjectSuccess', () => {
    const project = 'test';
    const correct = {
      type: actions.FETCH_PROJECT_SUCCESS,
      project,
    };
    expect(functions.fetchProjectSuccess(project)).to.deep.equal(correct);
  });

  it('saveProjection', () => {
    const projection = 'test';
    const name = 'test 2';
    const correct = {
      type: actions.SAVE_PROJECTION_REQUEST,
      projection,
      name,
    };
    expect(functions.saveProjection(projection, name)).to.deep.equal(correct);
  });

  it('updateProject', () => {
    const project = 'test';
    const correct = {
      type: actions.UPDATE_PROJECT_REQUEST,
      project,
    };
    expect(functions.updateProject(project)).to.deep.equal(correct);
  });

  it('dismissMessage', () => {
    const correct = {
      type: actions.SET_MESSAGE,
      message: '',
    };
    expect(functions.dismissMessage()).to.deep.equal(correct);
  });

  it('resetProject', () => {
    const correct = {
      type: actions.RESET_PROJECT,
    };
    expect(functions.resetProject()).to.deep.equal(correct);
  });

  it('setIsNewProject', () => {
    const value = 'test';
    const correct = {
      type: actions.SET_IS_NEW_PROJECT,
      value,
    };
    expect(functions.setIsNewProject(value)).to.deep.equal(correct);
  });

  it('fetchStatusSuccess', () => {
    const status = 'test';
    const correct = {
      type: actions.FETCH_STATUS_SUCCESS,
      status,
    };
    expect(statusFunctions.fetchStatusSuccess(status)).to.deep.equal(correct);
  });

  it('fetchAllStatusData', () => {
    const name = 'test';
    const correct = {
      type: actions.FETCH_PROJECT_STATUS_DATA,
      name,
    };
    expect(statusFunctions.fetchAllStatusData(name)).to.deep.equal(correct);
  });

  it('fetchProjects', () => {
    const correct = { type: actions.FETCH_PROJECTS };
    expect(projectFunctions.fetchProjects()).to.deep.equal(correct);
  });
});
