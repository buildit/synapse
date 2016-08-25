const d3 = require('d3');
import React from 'react';
import yScaleCreator from './y-scale';
import dateScaleCreator from './date-scale';
import parseTime from './parse-time';
import Button from '../../1-atoms/Button';
import $ from 'jquery';

export default class StatusChart extends React.Component {
  constructor() {
    super();
    this.points = null;
    this.chart = null;
    this.chartEffort = null;
    this.vis = null;
    this.projectionScale = null;
    this.yOffset = {
      demand: 0,
      defect: 450,
      effort: 900,
    };
  }

  componentDidMount() {
    const {
      demandCategories, defectCategories, effortCategories,
      defectStatus, effortStatus,
     } = this.props;
    const demandStatus = this.props.data;

    this.setVis();

    this.setDateAxis(this.yOffset.demand, this.props.data, this.props.demandCategories, 'demand');
    this.setDateAxis(this.yOffset.defect, this.props.data, this.props.defectCategories, 'defect');
    this.setDateAxis(this.yOffset.effort, this.props.data, this.props.effortCategories, 'effort');

    this.setYAxisLabel(this.yOffset.demand, 'Stories');
    this.setYAxisLabel(this.yOffset.defect, 'Count');
    this.setYAxisLabel(this.yOffset.effort, 'Person/Days');

    this.setYAxis(this.yOffset.demand, demandStatus, demandCategories, 'demandY');
    this.setYAxis(this.yOffset.defect, defectStatus, defectCategories, 'defectY');
    this.setYAxis(this.yOffset.effort, effortStatus, effortCategories, 'effortY');
  }

  componentDidUpdate() {
    const {
      demandCategories, defectCategories, effortCategories,
      defectStatus, effortStatus,
     } = this.props;
    const demandStatus = this.props.data;

    this.setDateAxis(this.yOffset.demand, this.props.data, this.props.demandCategories, 'demand');
    this.setDateAxis(this.yOffset.defect, this.props.data, this.props.defectCategories, 'defect');
    this.setDateAxis(this.yOffset.effort, this.props.data, this.props.effortCategories, 'effort');

    this.setYAxis(this.yOffset.demand, demandStatus, demandCategories, 'demandY');
    this.setYAxis(this.yOffset.defect, defectStatus, defectCategories, 'defectY');
    this.setYAxis(this.yOffset.effort, effortStatus, effortCategories, 'effortY');

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

  setVis() {
    this.vis = d3.select(this.chart).append('svg')
      .attr('class', 'chart')
      .attr('width', this.chart.clientWidth)
      .append('g')
        .attr('transform', `translate(${this.props.padding.left}, ${this.props.padding.top})`);

    this.vis.append('path')
      .attr('class', 'area');
  }

  setYAxis(yOffset = 0, data, categories, name) {
    const yScale = yScaleCreator(yOffset, data, categories);
    this.vis.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', 'translate(-20, 0)')
      .attr('id', name)
      .call(d3.axisLeft(yScale));
      console.log(yScale)
  }

  setDateAxis(yOffset = 0, data, categories, name) {
    const height = this.getSize().height;
    const width = this.getSize().width;
    const dateScale = dateScaleCreator(yOffset, data, width);
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

    d3.select('#demandChart').remove();
    d3.select('#defectChart').remove();
    d3.select('#effortChart').remove();

    d3.select('#demandY').remove();
    d3.select('#defectY').remove();
    d3.select('#effortY').remove();

    const demandID = 'demandChart';
    const defectID = 'defectChart';
    const effortID = 'effortChart';


    this.updateArea(
      this.yOffset.demand,
      this.props.data,
      this.props.demandCategories,
      demandID
    );

    this.updateArea(
      this.yOffset.defect,
      this.props.defectStatus,
      this.props.defectCategories,
      defectID
    );

    this.updateLine(
      this.yOffset.effort,
      this.props.effortStatus,
      this.props.effortCategories,
      effortID
    );
  }

  updateArea(yOffset, data = [], categories, chartID) {
    const width = this.getSize().width;
    const dateScale = dateScaleCreator(yOffset, data, width);
    const yScale = yScaleCreator(yOffset, data, categories);

    const area = d3.area()
      // curve(d3.curveCardinal)
      .x(d => dateScale(parseTime(d.data.date)))
      .y0(d => yScale(d[0] || 0))
      .y1(d => yScale(d[1] || 0));

    const stack = d3.stack()
      .keys(categories)
      .order(d3.stackOrderReverse)
      .offset(d3.stackOffsetNone);

    if (data.length > 0) {
      const stackContainer = this.vis.append('g')
      .attr('id', chartID)
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

  updateLine(yOffset, data = [], categories, chartID) {
    const width = this.getSize().width;
    const dateScale = dateScaleCreator(yOffset, data, width);
    const yScale = yScaleCreator(yOffset, data, categories);

    const area = d3.area()
      .curve(d3.curveBasis)
      .x(d => dateScale(parseTime(d.data.date)))
      .y0(d => yScale(d[0] || 0))
      .y1(d => yScale(d[1] || 0));

    const stack = d3.stack()
      .keys(categories)
      .order(d3.stackOrderReverse)
      .offset(d3.stackOffsetNone);

    if (data.length > 0) {
      const stackContainer = this.vis.append('g')
      .attr('id', chartID)
      .attr('class', 'stack');

      const layer = stackContainer.selectAll('.layer')
        .data(stack(data))
        .enter()
        .append('g')
        .attr('class', 'layer');

      layer.append('path')
        .attr('class', 'area')
        .style('fill', 'transparent')
        .style('stroke', (d, i) => d3.schemeCategory20[i])
        .style('stroke-width', 2)
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

  updateProjection() {
    console.log("projection scale",this.projectionScale)
    if ($('#projection').is(':visible')) {
      d3.select('#projection').remove();
    } else {
      const projectionArray = this.props.projectionPoints;
      const dates = projectionArray.map(item => (parseTime(item.date)));
      const values = projectionArray.map(item => (item.y));


      const margin = { top: 100, right: 0, bottom: 0, left: 0 };
      const width = 600 - margin.left - margin.right;
      const height = 200;

      const xScale = d3.scaleTime()
      .domain(d3.extent(dates))
      .range([0, width]);

      const yScale = d3.scaleLinear()
      .domain(d3.extent(values))
      .range([height, 0]);

      const svg =
      d3.select('#demandChart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('id', 'projection')
        .attr('className', 'projection ')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      const line = d3.line()
      .curve(d3.curveCardinal.tension(0.1))
      .x(function(d) {
        return xScale(parseTime(d.date));
      })
      .y(function(d) {
        return yScale(d.y);
      });


      svg.append('path')
     .datum(projectionArray)
     .attr('class', 'line')
     .style('stroke-dasharray', ('4, 4'))
     .attr('d', line);
    }
  }

  render() {
    return (
      <div className="status-chart">
        <div>
          <Button
            label="Projection"
            onClick={() => {
              this.updateProjection();
            }}
          />
        </div>
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
  projectionPoints: React.PropTypes.array.isRequired,
};

StatusChart.defaultProps = {
  padding: { top: 40, right: 30, bottom: 160, left: 70 },
};
