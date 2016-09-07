const d3 = require('d3');
import lineGenerator from './line-generator';
import makePoints from '../../../../helpers/makePoints';
import moment from 'moment';

module.exports = (data, dateScale, yScale) => {
  const startDate = moment(data.startDate, 'YYYY MM DD').format('DD-MMM-YY');
  const points = makePoints(data, startDate);
  // const newPoints = points.map(item => {
  //   const newDate = moment(item.date, 'YYYY MM DD').format('DD-MMM-YY');
  //   return {
  //     date: newDate,
  //     y: item.y,
  //   };
  // });
  // const formatPoints = moment(points, 'YYYY MM DD').format('DD-MMM-YY');
  const line = lineGenerator(dateScale, yScale);
  d3.select('#demandChart')
    .append('g')
    .attr('class', 'projectionLine')
    .append('path')
    .datum(points)
    .attr('d', line)
    .attr('stroke', 'steel-blue')
    .attr('stroke-width', '10px')
    .attr('opacity', 0.5);
};
