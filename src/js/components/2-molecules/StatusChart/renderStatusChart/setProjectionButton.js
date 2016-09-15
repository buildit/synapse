module.exports = containerElement => (
  containerElement
    .append('g')
    .attr('class', 'projection-button')
    .attr('transform', 'translate(-20, 0)')
    .append('text')
    .text('Show projection')
);
