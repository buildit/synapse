const d3 = require('d3');

module.exports = (dateScale, yScale) => (
d3.line()
  .x(d => {
    console.log("d", d)
    console.log("date scale", dateScale(d.date))
    console.log("y scale", yScale(d.y))
  return dateScale(d.date);
  })
  .y(d => yScale(d.y))
);
