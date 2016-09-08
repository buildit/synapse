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
    .datum(points)
    .style('stroke-dasharray', ('3, 3'))
    .attr('d', line);
};
