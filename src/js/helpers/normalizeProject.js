import normalizeDate from './normalizeDate';

const normalizeProject = project => {
  const normalizedProject = project;
  normalizedProject.startDate = normalizeDate(normalizedProject.startDate);
  normalizedProject.endDate = normalizeDate(normalizedProject.endDate);

  if (!normalizedProject.demand) {
    normalizedProject.demand = {
      flow: [],
    };
  }

  if (!normalizedProject.defect) {
    normalizedProject.defect = {
      flow: [],
      severity: [],
    };
  }

  if (!normalizedProject.effort) {
    normalizedProject.effort = {
      role: [],
    };
  }
  return normalizedProject;
};

export default normalizeProject;
