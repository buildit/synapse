import normalizeDate from './normalizeDate';

const normalizeProject = project => {
  project.startDate = normalizeDate(project.startDate);
  project.endDate = normalizeDate(project.endDate);

  if (!project.demand) {
    project.demand = {
      flow: [],
    };
  }

  if (!project.defect) {
    project.defect = {
      flow: [],
      severity: [],
    };
  }

  if (!project.effort) {
    project.effort = {
      role: [],
    };
  }
  return project;
};

export default normalizeProject;
