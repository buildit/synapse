import normalizeDate from './normalizeDate';

const headerFields = [
  'name',
  'portfolio',
  'startDate',
  'endDate',
  'description',
];

const isHeaderField = field => headerFields.indexOf(field) > -1;

const normalizeProject = project => {
  const normalizedProject = project;
  normalizedProject.startDate = normalizeDate(normalizedProject.startDate) || '2000-01-01';
  normalizedProject.endDate = normalizeDate(normalizedProject.endDate) || '2020-01-01';

  const fields = Object.keys(project);
  fields.forEach(field => {
    if (isHeaderField(field)) {
      normalizedProject[field] = project[field].toString();
    }
  });

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
