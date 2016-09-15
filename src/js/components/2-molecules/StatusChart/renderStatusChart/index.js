// const d3 = require('d3');
const setChart = require('./setChart');
const renderYAxis = require('./renderYAxis');
const renderYAxisLabel = require('./renderYAxisLabel');
const renderDemandChart = require('./renderDemandChart');
const renderProjection = require('./renderProjection');
const setProjectionButton = require('./setProjectionButton');
const toggleProjectionButton = require('./toggleProjectionButton');
import dateScaleCreator from './dateScaleCreator';
import yScaleCreator from './yScaleCreator';
import getChartableDates from './getChartableDates';
import getChartableValues from './getChartableValues';
import getChartableDemandValues from './getChartableDemandValues';
import {
  PADDING,
  WIDTH,
  HEIGHT,
  DEMAND_Y_OFFSET,
  DEFECT_Y_OFFSET,
  EFFORT_Y_OFFSET,
  DEMAND_Y_LABEL,
  DEFECT_Y_LABEL,
  EFFORT_Y_LABEL,
} from './config';

module.exports = (props, containerElement) => {
  const { data,
    defectStatus,
    effortStatus,
    projection,
    demandCategories,
    defectCategories,
    effortCategories,
   } = props;

  let isProjectionVisible = true; // TODO: Drive this by the d3 UI

  // Set up chart container
  const chartContainer = setChart(containerElement, WIDTH, HEIGHT, PADDING);

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

  // Render the axes
  renderYAxis(chartContainer, DEMAND_Y_LABEL, demandYScale);
  renderYAxis(chartContainer, DEFECT_Y_LABEL, defectYScale);
  // renderYAxis(chartContainer, EFFORT_Y_LABEL, effortYScale); // This one not placed correctly.

  // Render the axis labels
  renderYAxisLabel(chartContainer, DEMAND_Y_LABEL, DEMAND_Y_OFFSET);
  renderYAxisLabel(chartContainer, DEFECT_Y_LABEL, DEFECT_Y_OFFSET);
  // renderYAxisLabel(chartContainer, EFFORT_Y_LABEL, EFFORT_Y_OFFSET);

  // Render the charts
  renderDemandChart(
    chartContainer,
    data,
    demandCategories,
    demandYScale,
    dateScale,
    'demandChart'
  );

  const projectionButton = setProjectionButton(chartContainer);
  projectionButton.on('click', () => {
    console.log(isProjectionVisible);
    isProjectionVisible = !isProjectionVisible;
    toggleProjectionButton(projectionButton, isProjectionVisible);
    // reset demandYScale conditionally
    // renderDemandChart();
    if (isProjectionVisible) {
      renderProjection({
        data: projection,
        yScale: demandYScale,
        dateScale,
      });
    }
  });
};
