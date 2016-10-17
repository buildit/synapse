const moment = require('moment');
const d3 = require('d3');
const getY = require('./getY');
const getDataSetValue = require('./getDataSetValue');
const renderProjectionDot = require('./renderProjectionDot');
const getProjectionY = require('./getProjectionY');
const setChart = require('./setChart');
const renderLegend = require('./renderLegend');
const initializeScrubber = require('./initializeScrubber');
const moveScrubber = require('./moveScrubber');
const updateScrubberText = require('./updateScrubberText');
const updateValues = require('./updateValues');
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
/* eslint-disable import/no-unresolved */
import findStatusChartOffset from '/helpers/findStatusChartOffset';
/* eslint-enable import/no-unresolved */

import {
  PADDING,
  WIDTH,
  HEIGHT,
  CHART_PADDING_LEFT,
  SPACE_BETWEEN_CHARTS,
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

  const chartOffsets = findStatusChartOffset([
    demandStatus, defectStatus, effortStatus,
  ], INDIVIDUAL_CHART_HEIGHT + SPACE_BETWEEN_CHARTS);
  const DEMAND_Y_OFFSET = chartOffsets[0];
  const DEFECT_Y_OFFSET = chartOffsets[1];
  const EFFORT_Y_OFFSET = chartOffsets[2];

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
  let scrubber;

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
        CHART_PADDING_LEFT,
        'demandChart'
      );
      renderLegend(
        demandChart,
        demandStatus,
        demandCategories,
        demandYScale,
        INDIVIDUAL_CHART_HEIGHT
      );
      renderYAxis(demandChart, `${Y_AXIS_ID}-demand`, demandYScale, CHART_PADDING_LEFT);
      renderYAxisLabel(demandChart, DEMAND_Y_LABEL, CHART_PADDING_LEFT, DEMAND_Y_OFFSET);
      renderDateAxis(
        demandChart,
        `${DATE_AXIS_ID}-demand`,
        dateScale,
        CHART_PADDING_LEFT,
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
        CHART_PADDING_LEFT,
        'defectChart'
      );
      renderLegend(
        defectChart,
        defectStatus,
        defectCategories,
        defectYScale,
        INDIVIDUAL_CHART_HEIGHT
      );
      renderYAxis(defectChart, `${Y_AXIS_ID}-defect`, defectYScale, CHART_PADDING_LEFT);
      renderYAxisLabel(defectChart, DEFECT_Y_LABEL, CHART_PADDING_LEFT, DEFECT_Y_OFFSET);
      renderDateAxis(
        defectChart,
        `${DATE_AXIS_ID}-defect`,
        dateScale,
        CHART_PADDING_LEFT,
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
        CHART_PADDING_LEFT,
        'effortChart'
      );
      renderLegend(
        effortChart,
        effortStatus,
        effortCategories,
        effortYScale,
        INDIVIDUAL_CHART_HEIGHT
      );
      renderYAxis(effortChart, `${Y_AXIS_ID}-effort`, effortYScale, CHART_PADDING_LEFT);
      renderYAxisLabel(effortChart, EFFORT_Y_LABEL, CHART_PADDING_LEFT, EFFORT_Y_OFFSET);
      renderDateAxis(
        effortChart,
        `${DATE_AXIS_ID}-effort`,
        dateScale,
        CHART_PADDING_LEFT,
        EFFORT_Y_OFFSET,
        INDIVIDUAL_CHART_HEIGHT);
    }
    scrubber = initializeScrubber(chartContainer, CHART_PADDING_LEFT);
  };

  prepareDateScale();
  prepareYScales();
  render();

  const projectionButton = setProjectionButton(chartContainer);

  /** EVENT LISTENERS **/
  // Projection button
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
        xOffset: CHART_PADDING_LEFT,
        dateScale,
      });
      if (isProjectionAlarm(demandStatus, projection)) {
        renderProjectionAlarm(demandChart, WIDTH, DEMAND_Y_OFFSET);
      }
      demandStatus.forEach(datapoint => {
        const doneValue = getY(datapoint.date, demandStatus, 'Done', demandYScale);
        console.log(datapoint.date, doneValue);
        const projectionValue = getProjectionY(datapoint.date, projection, dateScale, demandYScale);
        if (projectionValue < doneValue) {
          renderProjectionDot(
            demandChart, datapoint.date, projection, dateScale, demandYScale, CHART_PADDING_LEFT);
        }
      });
    }
  });

  // Scrubber line
  const isXInBounds = (x) => {
    return x >= CHART_PADDING_LEFT && x <= WIDTH;
  };
  chartContainer.on('mousemove', function () {
    const x = d3.mouse(this)[0];
    const date = dateScale.invert(x - CHART_PADDING_LEFT);
    const formattedDate = moment(date).format('DD-MMM-YY');
    const doneValue = getDataSetValue(formattedDate, demandStatus, 'Done');
    console.log(date, doneValue);
    if (isXInBounds(x)) {
      moveScrubber(scrubber, x);
      updateScrubberText(date);
      updateValues('Done', doneValue);
    }
  });
};
