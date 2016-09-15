module.exports = (containerElement, label, yOffset) => (
  containerElement
    .append('g')
    .attr('transform', `translate(-55, ${yOffset + 140})`)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .text(label)
);
