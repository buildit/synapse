const d3 = require('d3');
const removeElement = require('./removeElement');

module.exports = (containerElement, id, dateScale, yOffset, height) => {
  removeElement(id);
  return (
    containerElement
    .append('g')
    .attr('id', id)
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${height + 20 + yOffset})`)
    .call(d3.axisBottom(dateScale))
  );
};
