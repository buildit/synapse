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
    this.update();
    this.setXAxis();
    this.setYAxis();
    this.setXAxisLabel('Sprint iterations');
    this.setYAxisLabel('Stories');
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
        .attr('class', 'line')
        .append('path')
          .attr('class', 'area');
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
    this.points = makePoints(this.props.projection);
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
      .duration(500)
      .attr('d', area(this.points));
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
};

ProjectionChart.defaultProps = {
  padding: { top: 40, right: 30, bottom: 60, left: 70 },
};
