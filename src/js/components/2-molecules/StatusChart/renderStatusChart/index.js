const setChart = require('./setChart');
import dateScaleCreator from '../date-scale-creator';
import yScaleCreator from '../yScaleCreator';
import getChartableDates from './getChartableDates';
import getChartableValues from './getChartableValues';
import getChartableDemandValues from './getChartableDemandValues';
import {
  PADDING,
  WIDTH,
  DEMAND_Y_OFFSET,
  DEFECT_Y_OFFSET,
  EFFORT_Y_OFFSET,
} from './config';

module.exports = (props, chartContainer) => {
  const { data,
    defectStatus,
    effortStatus,
    projection,
    demandCategories,
    defectCategories,
    effortCategories,
   } = props;

  const isProjectionVisible = true; // TODO: Drive this by the d3 UI

  // Set up chart container
  setChart(chartContainer, WIDTH, PADDING);

  // Prepare data to be usable by the scale generators
  const dates = getChartableDates(
    data,
    defectStatus,
    effortStatus,
    projection,
    WIDTH,
    isProjectionVisible
  );

  // Create the dateScale function
  const dateScale = dateScaleCreator(dates, WIDTH);

  // Prepare values to be usable by the y Scale generator
  // debugger;
  const demandValues = getChartableDemandValues(
    data,
    demandCategories,
    projection,
    isProjectionVisible
  );
  const defectValues = getChartableValues(defectStatus, defectCategories);
  const effortValues = getChartableValues(effortStatus, effortCategories);

  // Create the 3 yScale functions
  const demandYScale = yScaleCreator(DEMAND_Y_OFFSET, demandValues);
  const defectYScale = yScaleCreator(DEFECT_Y_OFFSET, defectValues);
  const effortYScale = yScaleCreator(EFFORT_Y_OFFSET, effortValues);
};
