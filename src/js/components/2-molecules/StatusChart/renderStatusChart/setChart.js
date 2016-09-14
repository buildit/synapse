const d3 = require('d3');

module.exports = (containerElement, width, height, padding) => (
  d3.select(containerElement).append('svg')
    .attr('class', 'chart-container')
    .attr('width', width)
    .attr('height', height)
    .append('g')
      .attr('class', 'chart-inner-container')
      .attr('transform', `translate(${padding.left}, ${padding.top})`)
);
