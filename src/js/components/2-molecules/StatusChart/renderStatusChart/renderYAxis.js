const d3 = require('d3');
const removeElement = require('./removeElement');

module.exports = (containerElement, id, yScale) => {
  debugger;
  removeElement(id);
  return (
    containerElement
    .append('g')
    .attr('id', id)
    .attr('class', 'axis')
    .attr('transform', 'translate(-20, 0)')
    .attr('width', 400)
    .call(d3.axisLeft(yScale))
  );
};
