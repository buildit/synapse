const writeFile = require('./lib/writeFile');
const mkdirp = require('./lib/mkdirp');
const projectData = require('../projectDefinitions/p007.json');
const path = './dist/.testApi/v1/project/';
const demandStatusData = require('./generateDemandData')();
const defectStatusData = require('./generateDefectData')();
const effortStatusData = require('./generateEffortData')();

const paths = [
  `${path}${projectData.name}/`,
  `${path}${projectData.name}/demand/summary/`,
  `${path}${projectData.name}/defect/summary/`,
  `${path}${projectData.name}/effort/summary/`,
];

// Create the project list
const projectList = [projectData].map(project => (
  {
    name: project.name,
    program: project.program,
    portfolio: project.portfolio,
    description: project.description,
  }
));

const fileList = [
  {
    filePath: `${path}index.html`,
    data: JSON.stringify(projectList),
  },
  {
    filePath: `${path}${projectData.name}/index.html`,
    data: JSON.stringify(projectData),
  },
  {
    filePath: `${path}${projectData.name}/demand/summary/index.html`,
    data: JSON.stringify(demandStatusData),
  },
  {
    filePath: `${path}${projectData.name}/defect/summary/index.html`,
    data: JSON.stringify(defectStatusData),
  },
  {
    filePath: `${path}${projectData.name}/effort/summary/index.html`,
    data: JSON.stringify(effortStatusData),
  },
];

/* eslint-disable no-console */
Promise.all(paths.map(mkdirp))
  .then(() => Promise.all(fileList.map(writeFile)))
  .catch(error => console.log(error));
/* eslint-enable no-console */
