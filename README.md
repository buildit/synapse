# Synapse
Management information dashboard.

## Usage
Install dependencies with:
```
npm install
```

Build and watch for changes:
```
npm run build
```

Start a local dev server:
```
npm start
```

## Configuration
Configuration details for the site are specified in the `config` folder. A default.json configuration file defines base configuration values. Additional configuration files can be used to override or add additional configuration to the app. The NODE_ENV environment value determines which additional configuration file to use. For example, if NODE_ENV equals 'production', then the production.json file is applied to the app configuration after the default.json file is applied. The NODE_ENV value can be set on the command line and the gulp build set this value that way. For example, for the build target, the value defined in the gulp file is "NODE_ENV='development' gulp".

We can then use the variables defined in the config folder in our code. For example, rather than referring to the api url in a literal string, refer to the value in the config file.

For example:

```
import config from 'config';
const apiBaseUrl = config.get('Client.api.baseUrl');
```

To create domain dynamic values, the docker-compose.yml.template can be used to set NODE_CONFIG json value with any data that you wish to override or add in a dynamic way.

## State tree
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

## We have lists
Here's a little table that describes the characteristics of the Flow, Role, and Severity lists.

|            |Sequence   |Name   |Group with|
|------------|-----------|-------|----------|
|**Flow**    |y          |y      |          |
|**Role**    |           |y      |y         |
|**Severity**|y          |y      |y         |


## Setting up for testing
There needs to be a Selenium server running for our UI tests to work. To install a standalone Selenium server:
```
curl -O http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.0.jar
```

Then, to run it:
```
java -jar selenium-server-standalone-2.53.0.jar
```

The local server also needs to be running the site at the client url specified in `config/development.json`. This site what the tests look at.
