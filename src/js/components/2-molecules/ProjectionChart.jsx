const d3 = require('d3');
import React from 'react';
const makePoints = require('../../helpers/makePoints');

const TRANSITION_DURATION = 200;

export default class ProjectionChart extends React.Component {
  constructor() {
    super();
    this.points = null;
    this.chart = null;
    this.vis = null;
  }

  componentDidMount() {
    this.setVis();
    this.setXAxis();
    this.setYAxis();
  }

  componentDidUpdate() {
    this.xAxisMax = this.props.zoom.xAxisMax;
    this.yAxisMax = this.props.zoom.yAxisMax;
    this.setXAxis();
    this.setYAxis();
    this.update();
  }

  componentWillUnmount() {
    this.vis.remove();
  }

  getSize() {
    return {
      width: 800 - this.props.padding.left - this.props.padding.right,
      height: this.chart.clientHeight - this.props.padding.top - this.props.padding.bottom,
    };
  }

  getScale() {
    const size = this.getSize();
    return {
      x: d3.scaleLinear()
        .domain([0, this.props.zoom.xAxisMax])
        .range([0, size.width]),

      y: d3.scaleLinear()
        .domain([this.props.zoom.yAxisMax, 0])
        .range([0, size.height]),
    };
  }

  setVis() {
    const size = this.getSize();
    this.vis = d3.select(this.chart).append('svg')
      .attr('class', 'chart')
      .attr('width', this.chart.clientWidth)
      .attr('height', this.chart.clientHeight)
      .append('g')
      .attr('transform', `translate(${this.props.padding.left}, ${this.props.padding.top})`);

    this.vis.append('svg')
      .attr('top', 0)
      .attr('left', 0)
      .attr('width', size.width)
      .attr('height', size.height)
      .attr('viewBox', `0 0 ${size.width} ${size.height}`)
      .attr('class', 'line');

    this.vis.append('path')
      .attr('class', 'area');

    this.vis.append('path')
      .attr('class', 'backlog');

    this.vis.append('path')
      .attr('class', 'dark-matter');
  }

  setYAxis() {
    d3.select('.axis--y').remove();

    const yScale = this.getScale().y;
    this.vis.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', 'translate(-20, 0)')
      .call(d3.axisLeft(yScale));
  }

  setXAxis() {
    d3.select('.axis--x').remove();

    const xScale = this.getScale().x;
    const height = this.getSize().height;
    const width = this.getSize().width;

    this.vis.append('g')
      .attr('class', 'axis-container')
      .attr('transform', `translate(0, ${height + 10})`)
        .append('g')
        .attr('class', 'axis axis--x')
        .call(d3.axisBottom(xScale));
  }

  setXAxisLabel(label) {
    const width = this.getSize().width;
    const height = this.getSize().height;
    this.vis.append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'end')
      .attr('x', width)
      .attr('y', height - 6)
      .text(label);
  }

  setYAxisLabel(label) {
    this.vis.append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', 30)
      .attr('transform', 'rotate(-90)')
      .text(label);
  }

  update() {
    const { projection } = this.props;
    const { backlogSize, darkMatter } = projection;
    this.points = makePoints(projection);
    this.updateBacklog(backlogSize);
    this.updateDarkMatter(backlogSize, darkMatter);
    this.updateCurve();
  }

  updateCurve() {
    const scale = this.getScale();
    const size = this.getSize();
    const area = d3.area()
      .x(d => scale.x(d.x))
      .y0(size.height)
      .y1(d => scale.y(d.y));

    this.vis.select('path.area')
      .transition()
      .duration(TRANSITION_DURATION)
      .attr('d', area(this.points));
  }

  updateBacklog(backlogSize) {
    const scale = this.getScale();

    const area = d3.area()
      .x(d => scale.x(d.x))
      .y0(scale.y(backlogSize))
      .y1(d => scale.y(d.y));

    this.vis.select('path.backlog')
      .transition()
      .duration(TRANSITION_DURATION)
      .attr('d', area(this.points));
  }

  updateDarkMatter(backlogSize, darkMatter) {
    const scale = this.getScale();

    const backlogSizeWithDarkMatter = backlogSize + backlogSize * (darkMatter / 100);

    const area = d3.area()
      .x(d => scale.x(d.x))
      .y0(scale.y(backlogSizeWithDarkMatter))
      .y1(scale.y(backlogSize));

    this.vis.select('path.dark-matter')
      .transition()
      .duration(TRANSITION_DURATION)
      .attr('d', area(this.points));
  }

  setXAxisMax(value) { this.xAxisMax = value; }

  // setYAxisMax(mouseY) {
  //   const position = isTopOrBottom(mouseY, this.chart.clientHeight);
  //   if (position === 'top') {
  //     this.yAxisMax *= 0.9;
  //   }
  //   if (position === 'bottom') {
  //     this.yAxisMax *= 1.1;
  //   }
  // }

  testDot(projection) {
    const { backlogSize, darkMatter } = projection;

    const yScale = this.getScale().y;

    this.vis.append('circle')
      .attr('cx', 0)
      .attr('cy', yScale(backlogSize))
      .attr('r', 10)
      .style('opacity', 0.1)
      .style('fill', 'aqua');

    const backlogSizeWithDarkMatter = backlogSize + backlogSize * (darkMatter / 100);

    this.vis.append('circle')
      .attr('cx', 0)
      .attr('cy', yScale(backlogSizeWithDarkMatter))
      .attr('r', 10)
      .style('opacity', 0.1)
      .style('fill', 'tomato');
  }

  render() {
    return (
      <div
        ref={(c) => { this.chart = c; return false; }}
        className="projection-chart"
      />);
  }
}

ProjectionChart.propTypes = {
  projection: React.PropTypes.object.isRequired,
  padding: React.PropTypes.object,
  zoom: React.PropTypes.object.isRequired,
};

ProjectionChart.defaultProps = {
  padding: { top: 40, right: 30, bottom: 60, left: 60 },
};
