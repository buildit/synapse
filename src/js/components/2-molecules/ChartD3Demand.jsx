const d3 = require('d3');
import React from 'react';
import moment from 'moment';
import getXPosition from '../../helpers/getXPosition';
import getY from '../../helpers/getY';
const data = require('../../helpers/fake-data-area-chart')();

const CONTAINER_WIDTH = 800;
const CONTAINER_HEIGHT = 400;
const CHART_HEIGHT = 200;
const CHART_SPACING = 10; // Spacing b/t charts
const margin = { top: 20, right: 20, bottom: 60, left: 40 };
const width = CONTAINER_WIDTH - margin.left - margin.right;
const height = CONTAINER_HEIGHT - margin.top - margin.bottom;

const TRANSITION_DURATION = 100;

export default class ChartD3DEmand extends React.Component {
  constructor() {
    super();
    this.chart = null;
    this.vis = null;
  }

  componentDidMount() {
    this.setVis();
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    this.vis.remove();
  }

  setPoints() {
    // const { projection } = this.props;
    // const { iterationLength } = projection;
    // this.points = makePoints(projection, this.startDate, iterationLength);
  }

  getSize() {
    return {
      width: 800 - this.props.padding.left - this.props.padding.right,
      height: this.chart.clientHeight - this.props.padding.top - this.props.padding.bottom,
    };
  }

  getScale() {
    // const size = this.getSize();
    // const parseTime = this.parseTime;
    //
    // const dateMin =
    //   this.points ? parseTime(this.points[0].date) : parseTime('01-Jan-01');
    // const dateMax =
    //   this.points ? parseTime(this.points[3].date) : parseTime('01-Feb-01');
    // const yMax = d3.max(this.points, point => point.y);
    //
    // return {
    //   date: d3.scaleTime()
    //     .domain([dateMin, dateMax])
    //     .range([0, size.width]),
    //
    //   y: d3.scaleLinear()
    //     .domain([yMax, 0])
    //     .range([0, size.height]),
    // };
  }

  setVis() {
    this.vis = d3.select(this.chart).append('svg')
    .append('svg')
    .attr('width', '1140px')
    .attr('height','400px')
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

    const values = [0, 800]; // Calculate based on data, not like this.
    const yScale = d3.scaleLinear()
  .domain([0, d3.max(values)])
  .range([CHART_HEIGHT, 0]);

  // Describe how area is drawn
    const area = d3.area()
  .x(function(d, i) { return xScale(d.data.date); })
  .y0(function(d) { return yScale(d[0]); })
  .y1(function(d) { return yScale(d[1]); });

  console.log(this.chart)
  const chartName = this.chart;

  // CHART 1
  // Draw line
    const chart1Offset = (CHART_HEIGHT + CHART_SPACING) * 0;
    const layer = this.vis.selectAll('.layer')
  .data(stack(data))
  .enter()
  .append('g')
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
    this.vis.append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', 'translate(0, ' + (CHART_HEIGHT + 25) + ')')
  .call(d3.axisBottom(xScale));

  /* y axis */
    this.vis.append('g')
  .attr('class', 'axis axis--y')
  .attr('transform', 'translate(30, ' + chart1Offset + ')')
  .call(d3.axisLeft(yScale));


  // Add scrubber
    const scrubbers = this.vis.append('g').attr('class', 'scrubbers');
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
    .style('visibility', 'visible')
    .style('opacity', '1');
  });
  }
  render() {
    return (
      <div
        ref={(c) => { this.chart = c; return false; }}
        className="demand-chart"
      />);
  }
}

ChartD3DEmand.propTypes = {
  // projection: React.PropTypes.object.isRequired,
  padding: React.PropTypes.object,
};

ChartD3DEmand.defaultProps = {
  padding: { top: 40, right: 30, bottom: 160, left: 60 },
};
