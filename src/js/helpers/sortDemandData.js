const getDate = require('./getDate');

module.exports = data => {
  const result = data;
  result.sort((a, b) => (
    getDate.utc(a.projectDate) - getDate.utc(b.projectDate)
  ));
  return result;
};
