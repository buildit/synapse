const isLogging = false;
// const isLogging = true;

import createSagaMiddleware from 'redux-saga';
import reducers from 'reducers';

// Sagas
import {
  watchFetchProjectionRequest,
  watchFetchProjects,
  watchFetchStarterProjectsRequest,
  watchFetchProjectRequest,
  watchSaveProjectionRequest,
  watchUpdateProjectRequest,
  watchSaveProjectRequest,
} from 'middleware/project';
import {
  watchFetchDemandStatusData,
} from 'middleware/status';

const redux = require('redux');

const addLoggingToDispatch = (store) => {
  /* eslint-disable no-console */
  const rawDispatch = store.dispatch;

  if (!isLogging) return rawDispatch;

  // Make sure the browser supports this crazee stuff.
  if (!console.group) return rawDispatch;

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
  /* eslint-enable no-console */
};

const sagaMiddleware = createSagaMiddleware();

module.exports = (initialState) => {
  const store = redux.createStore(
    reducers,
    initialState,
    redux.applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(watchFetchProjectionRequest);
  sagaMiddleware.run(watchFetchDemandStatusData);
  sagaMiddleware.run(watchFetchProjects);
  sagaMiddleware.run(watchFetchStarterProjectsRequest);
  sagaMiddleware.run(watchFetchProjectRequest);
  sagaMiddleware.run(watchSaveProjectionRequest);
  sagaMiddleware.run(watchUpdateProjectRequest);
  sagaMiddleware.run(watchSaveProjectRequest);

  store.dispatch = addLoggingToDispatch(store);

  return store;
};
