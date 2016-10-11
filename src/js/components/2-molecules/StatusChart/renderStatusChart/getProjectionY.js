const moment = require('moment');
const makePoints = require('helpers/makePoints');
const d3 = require('d3');
const parseTime = d3.timeParse('%d-%b-%y');

const convertDateToXPixelValue = (date, dateScale) => dateScale(parseTime(date));
const convertStoriesToYPixelValue = (y, yScale) => yScale(y);

const getRegion = (date, projectionPoints) => {
  const parsedDate = moment(date, 'DD-MMM-YY');
  // if (parsedDate.isBefore(moment('13-Jul-16', 'DD-MMM-YY'))) {}
  const projectionDates = projectionPoints.map(point => (
    moment(point.date, 'DD-MMM-YY')
  ));
  if (parsedDate.isAfter(projectionDates[0]) && parsedDate.isBefore(projectionDates[1])) {
    return 0;
  }
  if (parsedDate.isAfter(projectionDates[1]) && parsedDate.isBefore(projectionDates[2])) {
    return 1;
  }
  if (parsedDate.isAfter(projectionDates[2]) && parsedDate.isBefore(projectionDates[3])) {
    return 2;
  }
  if (parsedDate.isAfter(projectionDates[3]) && parsedDate.isBefore(projectionDates[4])) {
    return 3;
  }
  return -1;
};

module.exports = (targetDate, projection, dateScale, yScale) => {
  const projectionStartDate =
    moment(projection.startDate, 'YYYY MM DD').format('DD-MMM-YY');
  const projectionPoints = makePoints(projection, projectionStartDate);

  let p1;
  let p2;

  switch (getRegion(targetDate, projectionPoints)) {
  case 0: {
    p1 = projectionPoints[0];
    p2 = projectionPoints[1];
  }
    break;
  case 1: {
    p1 = projectionPoints[1];
    p2 = projectionPoints[2];
  }
    break;
  case 2: {
    p1 = projectionPoints[2];
    p2 = projectionPoints[3];
  }
    break;
  case 3: {
    p1 = projectionPoints[3];
    p2 = projectionPoints[4];
  }
    break;
  default: {
    p1 = projectionPoints[0];
    p2 = projectionPoints[1];
  }

  }


  // Solving for y = mx + b
  const x1 = convertDateToXPixelValue(p1.date, dateScale);
  const x2 = convertDateToXPixelValue(p2.date, dateScale);
  const y1 = convertStoriesToYPixelValue(p1.y, yScale);
  const y2 = convertStoriesToYPixelValue(p2.y, yScale);
  const m = (y2 - y1) / (x2 - x1);
  const xTarget = convertDateToXPixelValue(targetDate, dateScale);
  const b = y1 - m * x1;
  const y = m * xTarget + b;

  return y;
};
