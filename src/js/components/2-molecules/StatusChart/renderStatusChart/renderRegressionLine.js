const d3 = require('d3');
import moment from 'moment';
import findStatusDateRange from 'helpers/findStatusDateRange';
import lineGenerator from './lineGenerator';
import linearRegressionLine from 'helpers/linearRegressionLine';
import { FORECAST_UPPER_BOUND } from './config';

const dateUpperBound = moment(FORECAST_UPPER_BOUND, 'MM-DD-YYYY');

const y = (statusData, targetDate, category) => linearRegressionLine({
  statusData,
  category,
  date: targetDate.format('DD-MMM-YY'),
});

const getDataInRange = ({ statusData, startDate, endDate }) => statusData.filter(datapoint => {
  const parsedDatapointDate = moment(datapoint.date, 'DD-MMM-YY');
  return parsedDatapointDate.isAfter(startDate) &&
    parsedDatapointDate.isBefore(endDate);
});

module.exports = ({ statusData, dateScale, xOffset, yScale, done, notDone }) => {
  console.log(done, notDone);
  const doneKey = done;
  const dateRange = findStatusDateRange(statusData, done);
  const doneStartDate = moment(dateRange[0], 'DD-MMM-YY');
  const doneEndDate = moment(dateRange[1], 'DD-MMM-YY');
  const forecastEndDate = moment(dateRange[0], 'DD-MMM-YY');

  const trimmedData = getDataInRange({
    statusData,
    startDate: doneStartDate,
    endDate: doneEndDate,
  });
  let endDate;
  let backlogY1 = 1;
  while (backlogY1 > 0 && forecastEndDate.isBefore(dateUpperBound)) {
    forecastEndDate.add(1, 'days');
    backlogY1 = y(trimmedData, forecastEndDate, 'Backlog');
    endDate = forecastEndDate.format('DD-MMM-YY');
  }
  const doneY0 = y(trimmedData, doneStartDate, done);
  const doneY1 = y(trimmedData, forecastEndDate, done);
  const backlogY0 = y(trimmedData, doneStartDate, 'Backlog');

  const donePoints = [
    { date: doneStartDate.format('DD-MMM-YY'), y: doneY0 },
    { date: forecastEndDate.format('DD-MMM-YY'), y: doneY1 },
  ];
  const backlogPoints = [
    { date: doneStartDate.format('DD-MMM-YY'), y: backlogY0 + doneY0 },
    { date: forecastEndDate.format('DD-MMM-YY'), y: backlogY1 + doneY1 },
  ];

  const line = lineGenerator(dateScale, yScale);
  if (moment(endDate, 'DD-MMM-YY').isBefore(dateUpperBound)) {
    d3.select('#demandChart')
    .append('path')
    .attr('class', 'regression-line done')
    .datum(donePoints)
    .attr('d', line)
    .attr('transform', `translate(${xOffset}, 0)`);

    d3.select('#demandChart')
    .append('path')
    .attr('class', 'regression-line backlog')
    .datum(backlogPoints)
    .attr('d', line)
    .attr('transform', `translate(${xOffset}, 0)`);

    return moment(endDate, 'DD-MMM-YY');
  }
  return undefined;
};
