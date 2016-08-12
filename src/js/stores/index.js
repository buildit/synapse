import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const redux = require('redux');

const addLoggingToDispatch = (store) => {
  /* eslint-disable no-console */
  const rawDispatch = store.dispatch;

  if (!console.group) {
    return rawDispatch;
  }

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

module.exports = (initialState) => {
  const store = redux.createStore(
    reducers,
    initialState,
    redux.applyMiddleware(thunkMiddleware)
  );

  store.dispatch = addLoggingToDispatch(store);

  return store;
};
