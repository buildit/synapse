const xhr = require('xhr');
import errorHelper from '../helpers/errorHelper';

// Is there a better way to structure this function so it has an expilcit return value?
/* eslint-disable consistent-return */
module.exports = uri => new Promise((resolve, reject) => {
  xhr(uri, (error, response) => {
    if (error) return reject(errorHelper(error));
    if (!(response.statusCode === 200 || response.statusCode === 304)) {
      return reject(errorHelper(response));
    }
    resolve(JSON.parse(response.body));
  });
});
/* eslint-enable consistent-return */
