import d3 from 'd3';
import React from 'react';
import moment from 'moment';
import getXPosition from '../../helpers/getXPosition';
import getY from '../../helpers/getY';
const data = require('../../helpers/fake-data-area-chart')();

const CONTAINER_WIDTH = 800;
const CONTAINER_HEIGHT = 900;
const CHART_HEIGHT = 200;
const CHART_SPACING = 100; // Spacing b/t charts
const margin = { top: 20, right: 20, bottom: 60, left: 40 };
const width = CONTAINER_WIDTH - margin.left - margin.right;
const height = CONTAINER_HEIGHT - margin.top - margin.bottom;

// Set up container for the charts
const ChartD3Test = ({ chartData }) => {
  d3.select(this.chart)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

  // Produce the "stack", which will be used to generate the area shape
  const stack = d3.stack()
  .keys(['todo', 'done'])
  .order(d3.stackOrderNone)
  .offset(d3.stackOffsetNone);

  // Describe how we map from dataset to pixel positions
  const dates = data.map(datapoint => (
  datapoint.date
  ));
  const xScale = d3.scaleTime()
  .domain(d3.extent(dates))
  .range([margin.left, width]);

  const values = [0, 1000]; // Calculate based on data, not like this.
  const yScale = d3.scaleLinear()
  .domain([0, d3.max(values)])
  .range([CHART_HEIGHT, 0]);

  // Describe how area is drawn
  const area = d3.area()
  .x(function(d, i) { return xScale(d.data.date); })
  .y0(function(d) { return yScale(d[0]); })
  .y1(function(d) { return yScale(d[1]); });

  // CHART 1
  // Draw line
  const chart1Offset = (CHART_HEIGHT + CHART_SPACING) * 0;
  const layer = this.chart.selectAll('.layer')
  .data(stack(data))
  .enter().append("g")
    .attr('class', 'layer');

  layer.append('path')
  .attr('class', 'area')
  .style('fill', function(d) {
    if (d.key === 'todo') {
      return 'darkorange';
    }
    if (d.key === 'done') {
      return 'cadetblue';
    }
    return '#555';
  })
  .attr('d', area);

  /* x axis */
  this.chart.append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', 'translate(0, ' + (CHART_HEIGHT + 25) + ')')
  .call(d3.axisBottom(xScale));

  /* y axis */
  this.chart.append('g')
  .attr('class', 'axis axis--y')
  .attr('transform', 'translate(30, ' + chart1Offset + ')')
  .call(d3.axisLeft(yScale));


  // Add scrubber
  const scrubbers = this.chart.append('g').attr('class', 'scrubbers');
  scrubbers.append('line')
  .attr('x1', 0)
  .attr('x2', 0)
  .attr('y1', chart1Offset - 10)
  .attr('y2', chart1Offset + CHART_HEIGHT + 10)
  .attr('class', 'scrubber scrubber1');

  // Add info-box
  const infoBoxDate = d3.select('.info-box .date');
  const infoBoxY1 = d3.select('.info-box .y1');
  const infoBoxY2 = d3.select('.info-box .y2');

  function updateInfo(info) {
    const formattedDate = moment(info.date).format('MMMM Do YYYY');
    infoBoxDate.html(formattedDate);
    infoBoxY1.html(info.y1);
    infoBoxY2.html(info.y2);
  }

  // Event handlers
  d3.select(this.chart)
  .on('mousemove', function() {
    const xPosition = getXPosition(this);
    d3.selectAll('.scrubber')
      .style('visibility', 'visible')
      .style('opacity', '0.5')
      .attr('x1', xPosition - margin.left)
      .attr('x2', xPosition - margin.left);

      // Given mouseX position, find x value in our dataset
    const currentDate = xScale.invert(xPosition);

      // Given x value in dataset, find y value in dataset
    const currentY1 = getY(currentDate, data, 'todo');
    const currentY2 = getY(currentDate, data, 'done');

      // Update this stuff in our info box
    d3.select('.info-box')
        .style('visibility', 'visible')
        .style('opacity', '1');

    d3.select('.info-box .y1-label')
        .style('background-color', 'darkorange');

    d3.select('.info-box .y2-label')
        .style('background-color', 'cadetblue');

    updateInfo({
      date: currentDate,
      y1: currentY1,
      y2: currentY2,
    });
  });

  d3.select(this.chart)
  .on('mouseout', function() {
    d3.selectAll('.scrubber')
      .style('visibility', 'hidden')
      .style('opacity', '0');
  });
  return (
    <div
      ref={(c) => { this.chart = c; return false; }}
      className="demand-chart"
    />);
};

export default ChartD3Test;
