const d3 = require('d3');
import lineGenerator from './lineGenerator';
import makePoints from '../../../../../helpers/makePoints';
import moment from 'moment';

module.exports = ({ data, dateScale, yScale }) => {
  // TODO: pull this point generation stuff into a separate function
  const startDate = moment(data.startDate, 'YYYY MM DD').format('DD-MMM-YY');
  const points = makePoints(data, startDate);
  const line = lineGenerator(dateScale, yScale);

  d3.select('#demandChart')
    .append('path')
    .attr('class', 'projectionLine')
    .attr('id', 'projectionLine')
    .attr('opacity', 1)
    .datum(points)
    .style('stroke-dasharray', ('3, 3'))
    .attr('d', line);
};
