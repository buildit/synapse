module.exports = (containerElement, label) => (
  containerElement
    .append('g')
    .attr('transform', 'translate(-55, 140)')
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .text(label)
);
