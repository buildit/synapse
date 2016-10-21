const moment = require('moment');
const today = moment().format('YYYY-MM-DD');

const blankProject = {
  name: '',
  demand: {
    flow: [],
  },
  defect: {
    flow: [],
    severity: [],
  },
  effort: {
    role: [],
  },
  projection: {
    backlogSize: 146,
    darkMatterPercentage: 0,
    iterationLength: 2,
    startVelocity: 5,
    targetVelocity: 20,
    startIterations: 3,
    endIterations: 3,
    endVelocity: 5,
    startDate: today,
  },
};

export default blankProject;
