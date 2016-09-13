const d3 = require('d3');

module.exports = (containerElement, width, padding) => (
  d3.select(containerElement).append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .append('g')
      .attr('transform', `translate(${padding.left}, ${padding.top})`)
);
