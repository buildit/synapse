/* eslint-disable import/no-unresolved */
const defaultConfig = require('config');
/* eslint-enable import/no-unresolved */
const apiBaseUrl = defaultConfig.parameters.api.baseUrl;
const fetch = require('../actions/fetch');

const projects = () => fetch(`${apiBaseUrl}v1/project/`);

const project = name => fetch(`${apiBaseUrl}v1/project/${name}`);
const projectDemandSummary = name => fetch(`${apiBaseUrl}v1/project/${name}/demand/summary`);
const projectDefectSummary = name => fetch(`${apiBaseUrl}v1/project/${name}/defect/summary`);
const projectEffortSummary = name => fetch(`${apiBaseUrl}v1/project/${name}/effort/summary`);


export default {
  projects,
  project,
  projectDemandSummary,
  projectDefectSummary,
  projectEffortSummary,
};
