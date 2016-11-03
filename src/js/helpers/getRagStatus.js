import moment from 'moment';
import makePoints from 'helpers/makePoints';

module.exports = (rawProjection, demand, doneKey = 'Done') => {
  if (!rawProjection) {
    return undefined;
  }
  const projection = {
    startDate: rawProjection.startDate,
    iterationLength: rawProjection.iterationLength,
    backlogSize: rawProjection.backlogSize,
    velocityMiddle: rawProjection.targetVelocity,
    darkMatter: rawProjection.darkMatterPercentage,
    periodStart: rawProjection.startIterations,
    velocityStart: rawProjection.startVelocity,
    periodEnd: rawProjection.endIterations,
    velocityEnd: rawProjection.endVelocity,
  };
  const projectionStartDate =
    moment(projection.startDate, 'YYYY MM DD').format('DD-MMM-YY');
  const projectionPoints = makePoints(projection, projectionStartDate);

  const projectionLastValue = projectionPoints[3].y;
  const demandLastValue = demand.reduce((finalDone, datapoint) => datapoint.status[doneKey]);

  if (projectionLastValue > demandLastValue) return 'RED';
  return 'GREEN';
};
