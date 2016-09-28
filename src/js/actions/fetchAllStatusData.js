import { FETCH_PROJECT_STATUS_DATA } from './actions';
import errorHelper from '../helpers/errorHelper';

const hostname = window.location.hostname;
let configFile = '';

if (hostname.includes('staging')) {
  configFile = './staging.json';
} else if (hostname.includes('localhost')) {
  configFile = './default.json';
} else {
  configFile = './production.json';
}

/* eslint-disable import/no-unresolved */
const configuration = require(`${configFile}`);
/* eslint-enable import/no-unresolved */
const apiBaseUrl = configuration.parameters.api.baseUrl;

const fetch = require('./fetch');

export const fetchStatusSuccess = status => ({
  type: 'FETCH_STATUS_SUCCESS',
  status,
});

export const fetchAllStatusData = name => dispatch => {
  dispatch({
    type: FETCH_PROJECT_STATUS_DATA,
    name
  });
};
