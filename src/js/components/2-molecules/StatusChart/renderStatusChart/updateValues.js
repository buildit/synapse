const d3 = require('d3');

module.exports = (className, value) => {
  console.log(className, value);
  d3.select(`.${className}`).text(value);
};
