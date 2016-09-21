// const d3 = require('d3');
const setChart = require('./setChart');
const renderLegend = require('./renderLegend');
const renderDateAxis = require('./renderDateAxis');
const renderYAxis = require('./renderYAxis');
const renderYAxisLabel = require('./renderYAxisLabel');
const renderStackedAreaChart = require('./renderStackedAreaChart');
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
  Y_AXIS_ID,
  DATE_AXIS_ID,
  INDIVIDUAL_CHART_HEIGHT,
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

  const chartContainer = setChart(containerElement, WIDTH, HEIGHT, PADDING);
  let demandChart;
  let defectChart;
  let effortChart;
  let demandValues;
  let defectValues;
  let effortValues;
  let demandYScale;
  let defectYScale;
  let effortYScale;
  let chartableDates;
  let dateScale;
  let isProjectionVisible = false;

  const prepareYScales = () => {
    demandValues = getChartableDemandValues(
      data,
      demandCategories,
      projection,
      isProjectionVisible
    );
    defectValues = getChartableValues(defectStatus, defectCategories);
    effortValues = getChartableValues(effortStatus, effortCategories);

    demandYScale = yScaleCreator(DEMAND_Y_OFFSET, demandValues);
    defectYScale = yScaleCreator(DEFECT_Y_OFFSET, defectValues);
    effortYScale = yScaleCreator(EFFORT_Y_OFFSET, effortValues);
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
    demandChart = renderStackedAreaChart(
      chartContainer,
      data,
      demandCategories,
      demandYScale,
      dateScale,
      'demandChart'
    );

    defectChart = renderStackedAreaChart(
      chartContainer,
      defectStatus,
      defectCategories,
      defectYScale,
      dateScale,
      'defectChart'
    );

    effortChart = renderStackedAreaChart(
      chartContainer,
      effortStatus,
      effortCategories,
      effortYScale,
      dateScale,
      'effortChart'
    );

    renderLegend(
      demandChart,
      data,
      demandCategories,
      demandYScale,
      INDIVIDUAL_CHART_HEIGHT
    );
    renderLegend(
      defectChart,
      defectStatus,
      defectCategories,
      defectYScale,
      INDIVIDUAL_CHART_HEIGHT
    );
    renderLegend(
      effortChart,
      effortStatus,
      effortCategories,
      effortYScale,
      INDIVIDUAL_CHART_HEIGHT
    );

    // Render the axes and labels
    renderYAxis(demandChart, `${Y_AXIS_ID}-demand`, demandYScale);
    renderYAxisLabel(demandChart, DEMAND_Y_LABEL, DEMAND_Y_OFFSET);
    renderDateAxis(
      demandChart,
      `${DATE_AXIS_ID}-demand`,
      dateScale,
      DEMAND_Y_OFFSET,
      INDIVIDUAL_CHART_HEIGHT);

    renderYAxis(defectChart, `${Y_AXIS_ID}-defect`, defectYScale);
    renderYAxisLabel(defectChart, DEFECT_Y_LABEL, DEFECT_Y_OFFSET);
    renderDateAxis(
      defectChart,
      `${DATE_AXIS_ID}-defect`,
      dateScale,
      DEFECT_Y_OFFSET,
      INDIVIDUAL_CHART_HEIGHT);

    renderYAxis(effortChart, `${Y_AXIS_ID}-effort`, effortYScale);
    renderYAxisLabel(effortChart, EFFORT_Y_LABEL, EFFORT_Y_OFFSET);
    renderDateAxis(
      effortChart,
      `${DATE_AXIS_ID}-effort`,
      dateScale,
      EFFORT_Y_OFFSET,
      INDIVIDUAL_CHART_HEIGHT);
  };

  prepareDateScale();
  prepareYScales();
  render();

  const projectionButton = setProjectionButton(chartContainer);

  // Event listeners
  projectionButton.on('click', () => {
    isProjectionVisible = !isProjectionVisible;

    toggleProjectionButton(projectionButton, isProjectionVisible);

    prepareDateScale();
    prepareYScales();
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
