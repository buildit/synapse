import normalizeDate from './normalizeDate';
import Ajv from 'ajv';
const ajv = new Ajv();
const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    startDate: { type: 'string' },
    iterationLength: { type: 'integer' },
    backlogSize: { type: 'integer' },
    targetVelocity: { type: 'integer' },
    darkMatterPercentage: { type: 'integer' },
    startIterations: { type: 'integer' },
    startVelocity: { type: 'integer' },
    endIterations: { type: 'integer' },
    endVelocity: { type: 'integer' },
  },
  required: [
    'startDate',
    'iterationLength',
    'backlogSize',
    'targetVelocity',
    'darkMatterPercentage',
    'startIterations',
    'startVelocity',
    'endIterations',
    'endVelocity',
  ],
};
const validate = ajv.compile(schema);

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

  const isProjectionValid = validate(project.projection);
  if (!isProjectionValid) {
    /* eslint-disable no-console */
    // TODO: Show this message to the user instead of logging to the console.
    console.error(
    `The projection as received from the API for the project named ${project.name}
    does not match the projection schema. Synapse will ignore this projection.
    The validation errors are:`);
    validate.errors.forEach(error => {
      console.error(error.message);
    });
    /* eslint-enable no-console */
    delete normalizedProject.projection;
  }

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
