const d3 = require('d3');

module.exports = (containerElement, data, categories, yScale, chartHeight) => {
  const stack = d3.stack()
    .keys(categories)
    .order(d3.stackOrderReverse)
    .offset(d3.stackOffsetNone);

  // Place the legend 30 px from the top of its chart
  const yTranslation = yScale(0) - chartHeight + 30;

  const legend = containerElement.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(0, ${yTranslation})`);

  legend.selectAll('.legend-item')
    .data(stack(data))
    .enter()
    .append('circle')
      .attr('r', 5)
      .attr('cx', 5)
      .attr('cy', (d, i) => i * 14)
      .attr('stroke', 'none')
      .attr('fill', (d, i) => d3.schemeCategory20[i]);

  legend.selectAll('.legend-item')
    .data(stack(data))
    .enter()
    .append('text')
      .attr('class', 'legend-item')
      .attr('x', 15)
      .attr('y', (d, i) => 4 + i * 14)
      .text(d => d.key);
};
