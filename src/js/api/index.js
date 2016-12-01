import config from 'helpers/config';
import { fetch, put, post, erase } from './xhr';

const projects = () => fetch(`${config.apiBaseUrl}v1/project/`);

const project = name => fetch(`${config.apiBaseUrl}v1/project/${name}`);
const projectDemandSummary = name => fetch(`${config.apiBaseUrl}v1/project/${name}/demand/summary`);
const projectDefectSummary = name => fetch(`${config.apiBaseUrl}v1/project/${name}/defect/summary`);
const projectEffortSummary = name => fetch(`${config.apiBaseUrl}v1/project/${name}/effort/summary`);

const starterProjects = () => fetch(
  `${config.starterProjectsBaseApiUrl}v1/project?status=available`
);

const saveProjection = (projection, name) => {
  put(
    `${config.apiBaseUrl}v1/project/${name}/projection`,
    projection
  );
};

const updateProject = (projectToUpdate) => {
  put(
    `${config.apiBaseUrl}v1/project/${projectToUpdate.name}`,
    projectToUpdate
  );
};

const saveProject = (projectToSave) => {
  post(
    `${config.apiBaseUrl}v1/project/${projectToSave.name}`,
    projectToSave
  );
};

const deleteProject = (projectToDelete) => {
  erase(
    `${config.apiBaseUrl}v1/project/${projectToDelete.name}`
  );
};

export default {
  projects,
  project,
  projectDemandSummary,
  projectDefectSummary,
  projectEffortSummary,
  starterProjects,
  saveProjection,
  updateProject,
  saveProject,
  deleteProject,
};
