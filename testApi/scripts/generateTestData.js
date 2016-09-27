const fs = require('fs');
const mkdirp = require('mkdirp');
const projectData = require('../projectDefinitions/p007.json');
const path = './dist/.testApi/v1/project/';
const demandStatusData = require('./generateDemandData')();
const defectStatusData = require('./generateDefectData')();
const effortStatusData = require('./generateEffortData')();

// Create the project list
const projectList = [projectData].map(project => (
  {
    name: project.name,
    program: project.program,
    portfolio: project.portfolio,
    description: project.description,
  }
));

// Create the individual project and its status data
/* eslint-disable no-shadow */ /* Because, um, errors. */
mkdirp(`${path}${projectData.name}/`, error => {
  if (error) throw error;
  fs.writeFile(`${path}index.html`, JSON.stringify(projectList), error => {
    if (error) throw error;
    fs.writeFile(`${path}${projectData.name}/index.html`, JSON.stringify(projectData), error => {
      if (error) throw error;
      mkdirp(`${path}${projectData.name}/demand/summary/`, error => {
        if (error) throw error;
        fs.writeFile(
          `${path}${projectData.name}/demand/summary/index.html`,
          JSON.stringify(demandStatusData), error => {
            if (error) throw error;
            mkdirp(`${path}${projectData.name}/defect/summary/`, error => {
              if (error) throw error;
              fs.writeFile(
                `${path}${projectData.name}/defect/summary/index.html`,
                JSON.stringify(defectStatusData), error => {
                  if (error) throw error;
                  mkdirp(`${path}${projectData.name}/effort/summary/`, error => {
                    if (error) throw error;
                    fs.writeFile(
                      `${path}${projectData.name}/effort/summary/index.html`,
                      JSON.stringify(effortStatusData), error => {
                        if (error) throw error;
                      });
                  });
                });
            });
          });
      });
    });
  });
});
/* eslint-enable no-shadow */
