const fs = require('fs');
const mkdirp = require('mkdirp');
const projectData = require('../projectDefinitions/p007.json');
const path = `./dist/.testApi/v1/project/${projectData.name}/`;

// Pull in status data.
// Right now those functions are simply returning literal arrays. Should generate this.

mkdirp(path, error => {
  if (error) throw error;
  fs.writeFile(`${path}index.html`, JSON.stringify(projectData), error => {
    if (error) throw error;
    console.log('Saved test data.');

    // Write status data
  });
});
