const d3 = require('d3');
import lineGenerator from './line-generator';
import makePoints from '../../../../helpers/makePoints';
import moment from 'moment';

module.exports = (data, width, yScale, dateMinMax) => {
  const startDate = moment(data.startDate, 'YYYY MM DD').format('DD-MMM-YY');
  const points = makePoints(data, startDate);
  const line = lineGenerator(width, yScale, dateMinMax);
  d3.select('#demandChart')
    .append('path')
    .attr('class', 'projectionLine')
    .attr('id', 'projectionLine')
    .attr('opacity', 0)
    .datum(points)
    .style('stroke-dasharray', ('3, 3'))
    .attr('d', line);
  d3.select('#demandChart')
    .append('text')
    .attr('class', 'projectionLineButton')
    .attr('x', 20)
    .attr('y', -20)
    .text('Show projection')
    .on('click', () => {
      const projectionLine = d3.selectAll('.projectionLine');
      const projectionLineButton = d3.selectAll('.projectionLineButton');
      const projectionLineOpacity = parseInt(projectionLine.attr('opacity'), 10);

      if (projectionLineOpacity === 0) {
        projectionLine.attr('opacity', 1);
        projectionLineButton.text('Hide projection');
      } else {
        projectionLine.attr('opacity', 0);
        projectionLineButton.text('Show projection');
      }
    });
};
