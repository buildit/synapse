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

Start a local dev server on port 3000:
```
npm start
```

## State tree
Our state tree has the following shape, with some typical values:

```
{
  appData: {
    projectList: [],
    isFetching: false
  },
  ui: {
    view: 'LIST_VIEW',
    errorMsg: 'There was an error fetching data from the server.'
  }
}
```

## We have lists
Here's a little table that describes the characteristics of the Flow, Role, and Severity lists.

            Sequence    Name    Group with
Flow        y           y
Role                    y       y
Severity    y           y       y
