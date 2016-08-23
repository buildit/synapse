const d3 = require('d3');
import React from 'react';

export default class StatusChart extends React.Component {
  constructor() {
    super();
    this.points = null;
    this.chart = null;
    this.vis = null;
    this.parseTime = d3.timeParse('%d-%b-%y');
    this.yOffset = {
      demand: 0,
      defect: 450,
      effort: 900,
    };
  }

  componentDidMount() {
    this.setVis();

    this.setDateAxis(this.yOffset.demand, this.props.data, this.props.demandCategories, 'demand');
    this.setDateAxis(this.yOffset.defect, this.props.data, this.props.defectCategories, 'defect');
    this.setDateAxis(this.yOffset.effort, this.props.data, this.props.effortCategories, 'effort');

    this.setYAxisLabel(this.yOffset.demand, 'Stories');
    this.setYAxisLabel(this.yOffset.defect, 'Count');
    this.setYAxisLabel(this.yOffset.effort, 'Person/Days');

    this.setYAxis(this.yOffset.demand);
    this.setYAxis(this.yOffset.defect);
    this.setYAxis(this.yOffset.effort);
  }

  componentDidUpdate() {
    this.setDateAxis(this.yOffset.demand, this.props.data, this.props.demandCategories, 'demand');
    this.setDateAxis(this.yOffset.defect, this.props.data, this.props.defectCategories, 'defect');
    this.setDateAxis(this.yOffset.effort, this.props.data, this.props.effortCategories, 'effort');

    this.setYAxis(this.yOffset.demand);
    this.setYAxis(this.yOffset.defect);
    this.setYAxis(this.yOffset.effort);

    this.update();
  }

  componentWillUnmount() {
    this.vis.remove();
  }

  getSize() {
    return {
      width: this.chart.clientWidth - this.props.padding.left - this.props.padding.right,
      height: 500 - this.props.padding.top - this.props.padding.bottom,
    };
  }

  getScale(yOffset = 0, data = [], categories = []) {
    const size = this.getSize();
    const dates = data.map(datapoint => this.parseTime(datapoint.date));
    // const maxYs = data.reduce((maxes, dataPoint) => {
    //   const dataPointMax = categories.reduce((sumAtPoint, category) => (
    //     sumAtPoint + dataPoint[category]
    //   ), 0);
    //   return maxes.concat(dataPointMax);
    // }, []);
    //
    // const maxY = maxYs.reduce((max, current) => (current > max ? current : max), 0);
    let maxY = 200;
    if (this.props.projectId === 'P001') {
      maxY = 500;
    }
    if (this.props.projectId === 'P003') {
      maxY = 140;
    }
    return {
      date: d3.scaleTime()
        .domain(d3.extent(dates))
        .range([0, size.width]),

      y: d3.scaleLinear()
        .domain([maxY, 0])
        .range([yOffset, size.height + yOffset]),
    };
  }

  setVis() {
    this.vis = d3.select(this.chart).append('svg')
      .attr('class', 'chart')
      .attr('width', this.chart.clientWidth)
      .append('g')
        .attr('transform', `translate(${this.props.padding.left}, ${this.props.padding.top})`);

    this.vis.append('path')
      .attr('class', 'area');
  }

  setYAxis(yOffset = 0, data, categories) {
    const yScale = this.getScale(yOffset, data, categories).y;
    this.vis.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', 'translate(-20, 0)')
      .call(d3.axisLeft(yScale));
  }

  setDateAxis(yOffset = 0, data, categories, name) {
    const dateScale = this.getScale(yOffset, data, categories).date;
    const height = this.getSize().height;
    this.vis.append('g')
      .attr('class', 'axis-container')
      .attr('transform', `translate(0, ${height + 20 + yOffset})`)
        .append('g')
        .attr('class', 'axis axis--date')
        .attr('id', name)
        .call(d3.axisBottom(dateScale));
  }

  setYAxisLabel(yOffset, label) {
    this.vis.append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', -60)
      .attr('x', -(yOffset + 140))
      .attr('transform', 'rotate(-90)')
      .text(label);
  }

  update() {
    d3.select('#demand').remove();
    d3.select('#defect').remove();
    d3.select('#effort').remove();
    this.updateCurve(
      this.yOffset.demand,
      this.props.data,
      this.props.demandCategories
    );

    this.updateCurve(
      this.yOffset.defect,
      this.props.defectStatus,
      this.props.defectCategories
    );

    this.updateCurveLine(
      this.yOffset.effort,
      this.props.effortStatus,
      this.props.effortCategories
    );
  }

  updateCurve(yOffset, data = [], categories) {
    const parseTime = this.parseTime;
    const xScale = this.getScale(yOffset, data, categories).date;
    const yScale = this.getScale(yOffset, data, categories).y;

    const area = d3.area()
      .x(d => xScale(parseTime(d.data.date)))
      .y0(d => yScale(d[0] || 0))
      .y1(d => yScale(d[1] || 0));

    const stack = d3.stack()
      .keys(categories)
      .order(d3.stackOrderReverse)
      .offset(d3.stackOffsetNone);

    if (data.length > 0) {
      const stackContainer = this.vis.append('g')
        .attr('class', 'stack');

      const layer = stackContainer.selectAll('.layer')
        .data(stack(data))
        .enter()
        .append('g')
        .attr('class', 'layer');

      layer.append('path')
        .attr('class', 'area')
        .style('fill', (d, i) => d3.schemeCategory20[i])
        .attr('d', area);
    }

    const legend = this.vis.append('g')
      .attr('class', 'legend');

    legend.selectAll('.legend-item')
      .data(stack(data))
      .enter()
      .append('circle')
        .attr('r', 5)
        .attr('cx', 20)
        .attr('cy', (d, i) => yOffset + 20 + i * 12)
        .attr('stroke', 'none')
        .attr('fill', (d, i) => d3.schemeCategory20[i]);

    legend.selectAll('.legend-item')
      .data(stack(data))
      .enter()
      .append('text')
        .attr('class', 'legend-item')
        .attr('x', 30)
        .attr('y', (d, i) => yOffset + 24 + i * 12)
        .text(d => d.key);
  }

  updateCurveLine(yOffset, data = [], categories) {
    const dates = data.map(item => (item.date));
    const values = data.map(item => (item.value));
    console.log("values", values);

    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
        .domain(d3.extent(dates))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(values))
        .range([height, 0]);

    const svg =
        d3.select(this.chart)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

      /* x axis */
    const chart1 = svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0, ' + (height + 10) + ')')
        .call(d3.axisBottom(xScale));

      /* y axis */
    svg.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(20, 0)')
        .call(d3.axisLeft(yScale));

    const line = d3.line()
        .curve(d3.curveCardinal.tension(0.1))
        .x(function(d) {
          return xScale(d.date);
        })
        .y(function(d) {
          return yScale(d.value);
        });

    console.log('data:', data);
    svg.append('path')
       .datum(data)
       .attr('class', 'line')
       .attr('d', line);

    // const parseTime = this.parseTime;
    // const xScale = this.getScale(yOffset, data, categories).date;
    // const yScale = this.getScale(yOffset, data, categories).y;

    // const area = d3.area()
    //   .x(d => xScale(parseTime(d.data.date)))
    //   .y0(d => yScale(d[0] || 0))
    //   .y1(d => yScale(d[1] || 0));

    const stack = d3.stack()
      .keys(categories)
      .order(d3.stackOrderReverse)
      .offset(d3.stackOffsetNone);

    // if (data.length > 0) {
    //   const stackContainer = this.vis.append('g')
    //     .attr('class', 'stack');
    //
    //   const layer = stackContainer.selectAll('.layer')
    //     .data(stack(data))
    //     .enter()
    //     .append('g')
    //     .attr('class', 'layer');
    //
    //   layer.append('path')
    //     .attr('class', 'area')
    //     .style('fill', (d, i) => d3.schemeCategory20[i])
    //     .attr('d', area);
    // }

    const legend = this.vis.append('g')
      .attr('class', 'legend');

    legend.selectAll('.legend-item')
      .data(stack(data))
      .enter()
      .append('circle')
        .attr('r', 5)
        .attr('cx', 20)
        .attr('cy', (d, i) => yOffset + 20 + i * 12)
        .attr('stroke', 'none')
        .attr('fill', (d, i) => d3.schemeCategory20[i]);

    legend.selectAll('.legend-item')
      .data(stack(data))
      .enter()
      .append('text')
        .attr('class', 'legend-item')
        .attr('x', 30)
        .attr('y', (d, i) => yOffset + 24 + i * 12)
        .text(d => d.key);
  }

  render() {
    return (
      <div className="status-chart">
        <div
          className="chart-container"
          ref={(c) => { this.chart = c; return false; }}
        />
      </div>
    );
  }
}

StatusChart.propTypes = {
  padding: React.PropTypes.object,
  data: React.PropTypes.array.isRequired,
  defectStatus: React.PropTypes.array.isRequired,
  effortStatus: React.PropTypes.array.isRequired,
  demandCategories: React.PropTypes.array.isRequired,
  defectCategories: React.PropTypes.array.isRequired,
  effortCategories: React.PropTypes.array.isRequired,
  projectId: React.PropTypes.string.isRequired,
};

StatusChart.defaultProps = {
  padding: { top: 40, right: 30, bottom: 160, left: 70 },
};
