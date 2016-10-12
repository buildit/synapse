const getY = require('./getY');
const renderProjectionDot = require('./renderProjectionDot');
const getProjectionY = require('./getProjectionY');
const setChart = require('./setChart');
const renderLegend = require('./renderLegend');
const renderDateAxis = require('./renderDateAxis');
const renderYAxis = require('./renderYAxis');
const renderYAxisLabel = require('./renderYAxisLabel');
const renderStackedAreaChart = require('./renderStackedAreaChart');
const renderProjection = require('./renderProjection');
const renderProjectionAlarm = require('./renderProjectionAlarm');
const setProjectionButton = require('./setProjectionButton');
const updateProjectionButton = require('./updateProjectionButton');
import dateScaleCreator from './dateScaleCreator';
import yScaleCreator from './yScaleCreator';
import getChartableDates from './getChartableDates';
import getChartableValues from './getChartableValues';
import getChartableDemandValues from './getChartableDemandValues';
import isProjectionAlarm from './isProjectionAlarm';
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

const isDataChartable = (data) => (
  data.length > 0
);

module.exports = (props, containerElement) => {
  const {
    demandStatus,
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

  console.log('show demand data', isDataChartable(demandStatus));
  console.log('show defect data', isDataChartable(defectStatus));
  console.log('show effort data', isDataChartable(effortStatus));

  const prepareYScales = () => {
    demandValues = getChartableDemandValues(
      demandStatus,
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
      demandStatus,
      defectStatus,
      effortStatus,
      projection,
      WIDTH,
      isProjectionVisible
    );
    dateScale = dateScaleCreator(chartableDates, WIDTH);
  };

  const render = () => {
    if (isDataChartable(demandStatus)) {
      demandChart = renderStackedAreaChart(
        chartContainer,
        demandStatus,
        demandCategories,
        demandYScale,
        dateScale,
        'demandChart'
      );
      renderLegend(
        demandChart,
        demandStatus,
        demandCategories,
        demandYScale,
        INDIVIDUAL_CHART_HEIGHT
      );
      renderYAxis(demandChart, `${Y_AXIS_ID}-demand`, demandYScale);
      renderYAxisLabel(demandChart, DEMAND_Y_LABEL, DEMAND_Y_OFFSET);
      renderDateAxis(
        demandChart,
        `${DATE_AXIS_ID}-demand`,
        dateScale,
        DEMAND_Y_OFFSET,
        INDIVIDUAL_CHART_HEIGHT);
    }
    if (isDataChartable(defectStatus)) {
      defectChart = renderStackedAreaChart(
        chartContainer,
        defectStatus,
        defectCategories,
        defectYScale,
        dateScale,
        'defectChart'
      );
      renderLegend(
        defectChart,
        defectStatus,
        defectCategories,
        defectYScale,
        INDIVIDUAL_CHART_HEIGHT
      );
      renderYAxis(defectChart, `${Y_AXIS_ID}-defect`, defectYScale);
      renderYAxisLabel(defectChart, DEFECT_Y_LABEL, DEFECT_Y_OFFSET);
      renderDateAxis(
        defectChart,
        `${DATE_AXIS_ID}-defect`,
        dateScale,
        DEFECT_Y_OFFSET,
        INDIVIDUAL_CHART_HEIGHT);
    }
    if (isDataChartable(effortStatus)) {
      effortChart = renderStackedAreaChart(
        chartContainer,
        effortStatus,
        effortCategories,
        effortYScale,
        dateScale,
        'effortChart'
      );
      renderLegend(
        effortChart,
        effortStatus,
        effortCategories,
        effortYScale,
        INDIVIDUAL_CHART_HEIGHT
      );
      renderYAxis(effortChart, `${Y_AXIS_ID}-effort`, effortYScale);
      renderYAxisLabel(effortChart, EFFORT_Y_LABEL, EFFORT_Y_OFFSET);
      renderDateAxis(
        effortChart,
        `${DATE_AXIS_ID}-effort`,
        dateScale,
        EFFORT_Y_OFFSET,
        INDIVIDUAL_CHART_HEIGHT);
    }
  };

  prepareDateScale();
  prepareYScales();
  render();

  const projectionButton = setProjectionButton(chartContainer);

  // Event listeners
  projectionButton.on('click', () => {
    isProjectionVisible = !isProjectionVisible;
    updateProjectionButton(projectionButton, isProjectionVisible);
    prepareDateScale();
    prepareYScales();
    render();
    if (isProjectionVisible) {
      renderProjection({
        data: projection,
        yScale: demandYScale,
        dateScale,
      });
      if (isProjectionAlarm(demandStatus, projection)) {
        renderProjectionAlarm(demandChart, WIDTH, DEMAND_Y_OFFSET);
      }
      demandStatus.forEach(datapoint => {
        const doneValue = getY(datapoint.date, demandStatus, 'Done', demandYScale);
        const projectionValue = getProjectionY(datapoint.date, projection, dateScale, demandYScale);
        if (projectionValue < doneValue) {
          renderProjectionDot(demandChart, datapoint.date, projection, dateScale, demandYScale);
        }
      });
    }
  });
};
