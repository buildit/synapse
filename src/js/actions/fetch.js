const xhr = require('xhr');

// Is there a better way to structure this function so it has an explcit return value?
/* eslint-disable consistent-return */
module.exports = uri => new Promise((resolve, reject) => {
  xhr(uri, (err, res, body) => {
    if (err) return reject(err);
    if (res.statusCode !== 200) return reject(new Error(body));
    resolve(JSON.parse(body));
  });
});
/* eslint-enable consistent-return */
