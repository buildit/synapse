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
Configuration details for the site are specified in the `config` folder. The variables in these files are exposed to the global client environment. The gulp task `config` determines which file gets exposed (development.js, production.js, etc). And the gulp task takes its cue from the process.env.NODE_ENV, which is set in the `build` script in package.json.

We can then use the variables defined in the config folder in our code. For example, rather than referring to the api url in a literal string, refer to the value in the config file:

Define the client url at the top of your file:

```
const apiBaseUrl = api.baseUrl;
```

Then use it like so:

```
$.get(`${apiBaseUrl}project/`)
```

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
