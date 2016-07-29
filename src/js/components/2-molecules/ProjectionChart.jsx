const d3 = require('d3');
import React from 'react';
const makePoints = require('../../helpers/makePoints');

export default class ProjectionChart extends React.Component {
  constructor() {
    super();
    this.points = null;
    this.chart = null;
    this.vis = null;
  }

  componentDidMount() {
    this.setVis();
    // this.setXLabel('Weeks');
    // this.setYLabel('Stories');
    this.update();
    this.setYAxis();
    this.setXAxis();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.vis.remove();
  }

  getSize() {
    return {
      width: this.chart.clientWidth - this.props.padding.left - this.props.padding.right,
      height: this.chart.clientHeight - this.props.padding.top - this.props.padding.bottom,
    };
  }

  getScale() {
    const lastPoint = this.points[this.points.length - 1];
    const size = this.getSize();
    return {
      x: d3.scaleLinear()
        .domain([0, 100])
        .range([0, size.width]),

      y: d3.scaleLinear()
        .domain([500, 0])
        .range([0, size.height]),
    };
  }

  setVis() {
    const size = this.getSize();
    this.vis = d3.select(this.chart).append('svg')
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
  }

  setYAxis() {
    const yScale = this.getScale().y;
    this.vis.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', 'translate(-20, 0)')
      .call(d3.axisLeft(yScale));
  }

  setXAxis() {
    const xScale = this.getScale().x;
    const height = this.getSize().height;
    this.vis.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height + 10})`)
      .call(d3.axisBottom(xScale));
  }

  setXLabel(xLabel) {
    const size = this.getSize();
    this.vis.append('text')
        .attr('class', 'axis')
        .text(xLabel)
        .attr('x', size.width / 2)
        .attr('y', size.height)
        .attr('dy', '2.4em')
        .style('text-anchor', 'middle');
  }

  setYLabel(yLabel) {
    const size = this.getSize();
    this.vis.append('g').append('text')
        .attr('class', 'axis')
        .text(yLabel)
        .style('text-anchor', 'middle')
        .attr('transform', `translate(-40 ${size.height / 2}) rotate(-90)`);
  }

  setMouseCallbacks() {
    d3.select(this.chart)
        .on('mousemove.drag', this.mouseMove)
        .on('touchmove.drag', this.mouseMove)
        .on('mouseup.drag', this.mouseUp)
        .on('touchend.drag', this.mouseUp);
  }

  update() {
    const size = this.getSize();
    this.points = makePoints(this.props.projection);
    console.log('points:', this.points);
    // this.updateXTicks(size.height);
    this.updateCurve();
  }

  updateCurve() {
    const scale = this.getScale();
    const size = this.getSize();
    const area = d3.area()
        .x(d => scale.x(d.x))
        .y0(size.height)
        .y1(d => scale.y(d.y));

    const path = this.vis.select('svg')
        .selectAll('path.area')
        .data(area(this.points));

    path.enter().append('path')
        .attr('class', 'area');
    path.exit().remove();
    this.vis.select('path.area').attr('d', area(this.points));
  }

  // updateXTicks(height) {
  //   this.updateXAxisTicks(height);
  // }
  //
  // updateXAxisTicks(height) {
  //   const lastPoint = this.points[this.points.length - 1];
  //   const scale = this.getScale();
  //   scale.x.domain([0, lastPoint.x * this.props.projection.iterationLength]);
  //   const tx = d => `translate(${scale.x(d)}, 0)`;
  //   const gx = this.vis.selectAll('g.xaxis')
  //       .data(scale.x.ticks(10), String)
  //       .attr('transform', tx);
  //   const gxe = gx.enter().insert('g', 'a')
  //       .attr('class', 'xaxis')
  //       .attr('transform', tx);
  //   gxe.append('text')
  //       .attr('class', 'axis')
  //       .attr('y', height)
  //       .attr('dy', '1em')
  //       .attr('text-anchor', 'middle')
  //       .text(d => d)
  //       .on('mouseover', function mouseOver() { d3.select(this).style('font-weight', 'bold'); })
  //       .on('mouseout', function mouseOut() { d3.select(this).style('font-weight', 'normal'); });
  //   gx.exit().remove();
  // }

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
};

ProjectionChart.defaultProps = {
  padding: { top: 40, right: 30, bottom: 60, left: 70 },
};
