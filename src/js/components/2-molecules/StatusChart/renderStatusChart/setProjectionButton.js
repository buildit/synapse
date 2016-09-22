module.exports = containerElement => {
  const button = containerElement.append('g')
    .attr('class', 'projection-button');

  button.append('rect')
    .attr('width', '113')
    .attr('height', '25')
    .attr('transform', 'translate(0, -30)'); // Place above chart

  button.append('text')
    .text('Show projection')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(56, -14)'); // Center text in rect

  return button;
};
