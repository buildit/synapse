module.exports = (containerElement, date, xOffset, yOffset) => (
  containerElement
  .append('g')
  .attr('class', 'forecasted-completion-date')
  .attr('transform', `translate(0, ${yOffset - 12})`)
    .append('text')
    .attr('text-anchor', 'start')
    .text(`Forecasted completion date: ${date}`)
);
