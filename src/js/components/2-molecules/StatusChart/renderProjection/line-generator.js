const d3 = require('d3');
const parseTime = d3.timeParse('%d-%b-%y');
const dateScaleGenerator = (dateMinMax, width) => (
  d3.scaleTime()
    .domain(dateMinMax)
   .range([0, width])
);

module.exports = (width, yScale, dateMinMax) => {
  const dateScale = dateScaleGenerator(dateMinMax, width);

  return d3.line()
    .curve(d3.curveCardinal.tension(0.1))
    .x(d => (
      dateScale(parseTime(d.date))
    ))
    .y(d => yScale(d.y));
};
