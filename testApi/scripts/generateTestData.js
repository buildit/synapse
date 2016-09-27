const fs = require('fs');
const mkdirp = require('mkdirp');
const projectData = require('../projectDefinitions/p007.json');
const path = './dist/.testApi/v1/project/';

// Pull in status data.
// Right now those functions are simply returning literal arrays. Should generate this.

// Create the project list
const projectList = [projectData].map(project => (
  {
    name: project.name,
    program: project.program,
    portfolio: project.portfolio,
    description: project.description,
  }
));

mkdirp(`${path}${projectData.name}/`, error => {
  if (error) throw error;
  fs.writeFile(`${path}index.html`, JSON.stringify(projectList), error => {
    if (error) throw error;
    console.log('Saved project list.');
    fs.writeFile(`${path}${projectData.name}/index.html`, JSON.stringify(projectData), error => {
      if (error) throw error;
      console.log('Saved project.');
      // Write status data
    });
  });
});
