const d3 = require('d3');

module.exports = function (element) {
  return d3.mouse(element)[0];
};
