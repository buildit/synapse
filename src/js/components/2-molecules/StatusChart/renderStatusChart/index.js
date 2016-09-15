// const d3 = require('d3');
const setChart = require('./setChart');
const renderDateAxis = require('./renderDateAxis');
const renderYAxis = require('./renderYAxis');
const renderYAxisLabel = require('./renderYAxisLabel');
const renderDateAxisLabel = require('./renderDateAxisLabel');
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
  // EFFORT_Y_OFFSET,
  DEMAND_Y_LABEL,
  DEFECT_Y_LABEL,
  // EFFORT_Y_LABEL,
  Y_AXIS_ID,
  DATE_AXIS_ID,
  INDIVIDUAL_CHART_HEIGHT,
  DATE_LABEL,
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

  let demandChart;
  let demandValues;
  let demandYScale;
  let chartableDates;
  let dateScale;
  let isProjectionVisible = false;

  const prepareYScale = () => {
    demandValues = getChartableDemandValues(
      data,
      demandCategories,
      projection,
      isProjectionVisible
    );
    demandYScale = yScaleCreator(DEMAND_Y_OFFSET, demandValues);
  };

  const prepareDateScale = () => {
    chartableDates = getChartableDates(
      data,
      defectStatus,
      effortStatus,
      projection,
      WIDTH,
      isProjectionVisible
    );
    dateScale = dateScaleCreator(chartableDates, WIDTH);
  };

  const render = () => {
    demandChart = renderDemandChart(
      chartContainer,
      data,
      demandCategories,
      demandYScale,
      dateScale,
      'demandChart'
    );

    // Render the axes and labels
    renderYAxis(demandChart, Y_AXIS_ID, demandYScale);
    renderYAxisLabel(demandChart, DEMAND_Y_LABEL);
    renderDateAxis(
      demandChart,
      DATE_AXIS_ID,
      dateScale,
      DEMAND_Y_OFFSET,
      INDIVIDUAL_CHART_HEIGHT);
  };

  const chartContainer = setChart(containerElement, WIDTH, HEIGHT, PADDING);

  prepareDateScale();
  prepareYScale();

  render();

  const projectionButton = setProjectionButton(chartContainer);

  // Event listeners
  projectionButton.on('click', () => {
    isProjectionVisible = !isProjectionVisible;

    toggleProjectionButton(projectionButton, isProjectionVisible);

    prepareDateScale();
    prepareYScale();

    render();

    if (isProjectionVisible) {
      renderProjection({
        data: projection,
        yScale: demandYScale,
        dateScale,
      });
    }
  });
};
