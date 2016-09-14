const d3 = require('d3');

module.exports = (containerElement, label, yScale) => (
  containerElement
    .append('g')
    .attr('class', 'axis axis--y')
    .attr('transform', 'translate(-20, 0)')
    .attr('width', 400)
    .attr('id', label)
    .call(d3.axisLeft(yScale))
);
