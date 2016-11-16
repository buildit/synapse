const d3 = require('d3');
import moment from 'moment';
import findStatusDateRange from 'helpers/findStatusDateRange';
import getForecastedCompletionDate from 'helpers/getForecastedCompletionDate';
import lineGenerator from './lineGenerator';
import polynomialRegressionLine from 'helpers/polynomialRegressionLine';

module.exports = ({ data, dateScale, xOffset, yScale }) => {
  const dateRange = findStatusDateRange(data, 'Backlog');
  const date = moment(dateRange[0], 'DD-MMM-YY');
  const forecastedCompletionDate = getForecastedCompletionDate(data);
  const endDate = forecastedCompletionDate ?
    moment(forecastedCompletionDate) :
    moment(dateRange[1]);

  const backlogPoints = [];
  while (date.isBefore(endDate)) {
    const backlogRegression = polynomialRegressionLine({
      statusData: data,
      category: 'Backlog',
      date: date.format('DD-MMM-YY'),
    });
    backlogPoints.push({
      date: date.format('DD-MMM-YY'),
      y: backlogRegression,
    });
    date.add(1, 'days');
  }

  const line = lineGenerator(dateScale, yScale);

  d3.select('#demandChart')
    .append('path')
    .attr('class', 'regression-line backlog')
    .datum(backlogPoints)
    .attr('d', line)
    .attr('transform', `translate(${xOffset}, 0)`);
};
