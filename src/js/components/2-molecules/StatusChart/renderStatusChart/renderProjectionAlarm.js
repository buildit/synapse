module.exports = (containerElement, xOffset, yOffset) => (
  containerElement
  .append('g')
  .attr('class', 'projection-alarm')
  .attr('transform', `translate(${xOffset - 100}, ${yOffset - 20})`)
    .append('text')
    .attr('text-anchor', 'end')
    .text('Projected end-date is exceeded!')
);
