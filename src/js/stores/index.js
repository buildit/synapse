const redux = require('redux');
const reducers = require('../reducers');

module.exports = (initialState) => (redux.createStore(reducers, initialState));
