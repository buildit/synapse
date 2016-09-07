# Synapse

### Code Quality Badges
NOTE: Except for build status, these other badges currently do not seem to be working correctly. Please ignore test and coverage badges at this time. Here now as a placeholder.

[![Jenkins tests](https://img.shields.io/jenkins/t/https/jenkins.qa.ubuntu.com/precise-desktop-amd64_default.svg?maxAge=2592000)](http://jenkins.riglet:9000/jenkins/job/synapse-staging-pipeline/) [![Jenkins coverage](https://img.shields.io/jenkins/c/https/jenkins.qa.ubuntu.com/address-book-service-utopic-i386-ci.svg?maxAge=2592000)](http://jenkins.riglet:9000/jenkins/job/synapse-staging-pipeline/)

#### Build Status
[![Build Status](http://jenkins.riglet:9000/jenkins/buildStatus/icon?job=synapse-staging-pipeline)](http://jenkins.riglet:9000/jenkins/job/synapse-staging-pipeline/)

## What is Synapse?
Synapse is a management information dashboard that provides metrics on projects.
The dashboard shows:

- **Project List** - List of all projects currently being tracked. You can also
add new projects from here.

- **Project Details** - Specifics concerning a given project such as start and
dates, demand flow, etc... Projects can be edited.

- **Project Status** - Graphical view of a given project showing demand, defect
and effort over time.

- **Project Projection** - A graphical view of a projects projected forecast with
the ability to adjust various factors to change the projection.

#### Deployments
Staging Environment: [Synapse Staging](http://synapse.staging.buildit.tools)

Production Environment: [Synapse Production](http://synapse.buildit.tools)

### Journey of the project (internal link)

### Getting Started (how to run it, build, deploy, test, analysis)
#### Prereqs
Node 6.4 or greater for NPM

#### Set up
Install dependencies with:
```
npm install
```

#### Configuration
Configuration details for the site are specified in the `config` folder. A default.json configuration file defines base configuration values. Additional configuration files can be used to override or add additional configuration to the app. The NODE_ENV environment value determines which additional configuration file to use. For example, if NODE_ENV equals 'production', then the production.json file is applied to the app configuration after the default.json file is applied. The NODE_ENV value can be set on the command line and the gulp build set this value that way. For example, for the build target, the value defined in the gulp file is "NODE_ENV='development' gulp".

We can then use the variables defined in the config folder in our code. For example, rather than referring to the api url in a literal string, refer to the value in the config file.

For example:
```
import config from 'config';
const apiBaseUrl = config.get('Client.api.baseUrl');
```

To create domain dynamic values, the docker-compose.yml.template can be used to set NODE_CONFIG json value with any data that you wish to override or add in a dynamic way.

#### Build
Build and watch for changes:
```
npm run build
```
#### Test
##### Unit Test
```
npm run test
```

##### Acceptance Test
You need to first have the Synapse app running and that app needs to be appropriately connected to a valid MI REST API service.
```
npm run test:acceptance
```

#### Analysis
Code Analysis:
```
npm run lint
```

#### Version
You need to run the following to version and tag the application. You use 'major' to bump the versions major number, 'minor' to bump the version minor version and 'patch' to bump the version patch number.
```
npm version patch -m "SYNAPSE-XX #comment Some version related comment"
```

#### Deploy
Deployment happens through Jenkins Pipeline workflow.

#### Run Locally
Start a local dev server:
```
npm start
```

## Developer Notes
#### State tree
Our state tree has the following shape, with some typical values:

```
{
  appData: {
    projectList: [],
    project: {...},
    isFetching: false
  },
  ui: {
    view: 'LIST_VIEW',
    errorMsg: 'There was an error fetching data from the server.',
    projectFormData: {...}
  }
}
```

## User Notes
#### We have lists
Here's a little table that describes the characteristics of the Flow, Role, and Severity lists.

|            |Sequence   |Name   |Group with|
|------------|-----------|-------|----------|
|**Flow**    |y          |y      |          |
|**Role**    |           |y      |y         |
|**Severity**|y          |y      |y         |

### Configure for Deployments
To run this app, you need access to the management information REST API (code name Eolas). Configuration of the base URL for the REST API is already handled in the deployemnt pipeline for staging and production. Running this app in a local development environment assumes the REST API service is running on locahost:6565 but can be overridden by specifying NODE_ENV=development MIDAS_API_URL=<EOLAS_BASE_URL> (which a trailing slash) when start the app.

Example
```
NODE_ENV=development MIDAS_API_URL=http://localhost:6565/ npm run start
```

### Coding Standards
#### HTML
We are using Code Guide's [style guide](http://codeguide.co/#html).
#### CSS
We are using Code Guide's [style guide](http://codeguide.co/#css).
#### JavaScript
We are using Airbnb's [coding standards](https://github.com/airbnb/javascript) and [linting rules](https://www.npmjs.com/package/eslint-config-airbnb).

#### Rule Changes
```
indent: error, 2
no-class-assign: warn
ecmaFeatures: experimentalObjectRestSpread: true
```

### How to Contribute
This project is currently an internal Buildit project and is not open to external resources. If you are an internal resource, please contact @digitalrigh to gain access to this project.

### Change Log
Still to come after proper integration with JIRA.

### Team
@spotted_dog

@ZacSmith777

@jorgesanchez2387

@digitalrigh

### License
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](http://doge.mit-license.org)
