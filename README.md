# Synapse

[![Build Status](http://jenkins.riglet:9000/jenkins/buildStatus/icon?job=synapse-staging-pipeline)](http://jenkins.riglet:9000/jenkins/job/synapse-staging-pipeline/)

## Quick Start
```
npm install
npm start
```
Visit [the app](http://localhost:3000/).

## What is Synapse?
Synapse is a Management Information (MI) dashboard that provides visualizations of metrics pertaining to the development and delivery of software projects.  Projects exist within the context of Programs (a related grouping of projects) and Portfolios (a related grouping of Programs).  Thus Synapse is able to provide overviews across any particular level or grouping.

Synapse provides:

- **Project List** - List of the projects currently being tracked. This allows you to select a particular project for viewing.  The *New* button also allows you to add a project to the list.

- **Project Projection** - Typically at the beginning of a project the "How long is this going to take" question is asked.  The Projection allows you to project a target completion date by tweaking a set of parameters (Start Date, Target Velocity, Backlog Size, ...).  The projection is based on an S-Curve concept that allows for adjusting Velocity to support Ramp Up and Release activities.  Dark Matter allows you to set a confidence level on the currently known backlog and plan for the discovery of additional requirements.

- **Project Status** - While operational systems provide a team level view one-dimensional view of a Project, they rarely provide the ability to view all of the dimensions that matter.  The Project Status page provides a graphical view of a given project's demand (scope), defects (quality), and effort (cost) over the life of the project.  This allows the user to rapidly determine if a project is or is not on track across all those dimensions.

In addition the previously created projection can be overlaid to the project's actuals to determine if the project is meeting forecast expectations.

- **Project Details** - The project details view provides a set of instructions to the system.  These instructions tell the Synapse what the operational source systems are for the various dimensions, what type the system is, a how to connect to that system to extract the necessary data.  Additionally the user can control what what data is displayed and in what order.

The Demand data specifies the status that a work item might be in, and how to stack it on the graph.  Status data that exists in the source system but is not listed will be ignored.  Additionally the user can decide to group one or more status together on the graph.

The Defect data specifies the severity that a defect item might be in, and how to stack it on the graph.  Severity data that exists in the source system but is not listed will be ignored.  Additionally the user can decide to group one or more severities together on the graph.

The Effort data specifies the roles that various people fill while working on the project.    Effort role types that exists in the source system but is not listed will be ignored.  Additionally the user can decide to group one or more roles together on the graph.

#### Deployments
Staging Environment: [Synapse Staging](http://synapse.staging.buildit.tools)

Production Environment: [Synapse Production](http://synapse.buildit.tools)

### Journey of the project ([The Journey](TheJourney.md))

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
npm start
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
We're using a Jenkins pipeline to deploy to production.

###### How to deploy the app to production

- Go to the Jenkins pipeline for [Synapse production] (http://jenkins.riglet:9000/jenkins/job/synapse-prod-pipeline/)
- Click "Build Now", which is on the left side of the page. This will begin the build process.
- Hover over the middle stage -- "Write docker-compose". You'll be prompted to choose a "tag". This allows you to choose which version of the build to send out into the world. Generally, you should use "latest". Click "Proceed".
- Watch for the build to succeed. If it does, you'll see the solid green dot at Jenkins. If not, check the Console Output on Jenkins and debug!

#### Run Locally
Start a local dev server:
```
npm start
```

## User Notes

### Configure for Deployments
To run this app, you need access to the management information REST API (code name Eolas). Configuration of the base URL for the REST API is already handled in the deployment pipeline for staging and production. Running this app in a local development environment assumes the REST API service is running on localhost:6565.

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
