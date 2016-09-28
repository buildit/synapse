/* eslint-disable import/no-unresolved */
const defaultConfig = require('../actions/default.json');
/* eslint-enable import/no-unresolved */
const apiBaseUrl = defaultConfig.parameters.api.baseUrl;
const fetch = require('../actions/fetch');

const projects = () => {
  return fetch(`${apiBaseUrl}v1/project/`);
};


const project = (name) => {
  return fetch(`${apiBaseUrl}v1/project/${name}`);
}
const projectDemandSummary = (name) => {
  return fetch(`${apiBaseUrl}v1/project/${name}/demand/summary`);
}
const projectDefectSummary = (name) => {
  return fetch(`${apiBaseUrl}v1/project/${name}/defect/summary`);
}
const projectEffortSummary = (name) => {
  return fetch(`${apiBaseUrl}v1/project/${name}/effort/summary`)
}


export default {
  projects,
  project,
  projectDemandSummary,
  projectDefectSummary,
  projectEffortSummary
}
