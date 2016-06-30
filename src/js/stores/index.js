import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const redux = require('redux');

module.exports = (initialState) => (redux.createStore(
  reducers,
  initialState,
  redux.applyMiddleware(
    thunkMiddleware
  )
));
