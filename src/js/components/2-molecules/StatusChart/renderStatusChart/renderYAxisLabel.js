module.exports = (containerElement, label, yOffset) => (
  containerElement
    .append('g')
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', -20)
      .attr('x', -(yOffset + 140))
      .attr('transform', 'rotate(-90)')
      .text(label)
);
