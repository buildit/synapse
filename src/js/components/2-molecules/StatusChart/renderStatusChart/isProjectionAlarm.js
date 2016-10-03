/* Projection alarm indicator
Given a set of status data and a projection object,
returns true if the projection end date is greater than the status data's end date,
false if otherwise.
*/
const moment = require('moment');
const makePoints = require('../../../../helpers/makePoints');

const getDates = datapoint => moment(datapoint.date, 'DD-MMM-YY');

module.exports = (data, projection) => {
  const statusDates = data.map(getDates);

  const projectionStartDate =
    moment(projection.startDate, 'YYYY MM DD').format('DD-MMM-YY');
  const projectionPoints = makePoints(projection, projectionStartDate);
  const projectionDates = projectionPoints.map(getDates);

  return moment.max(statusDates).isAfter(moment.max(projectionDates));
};
