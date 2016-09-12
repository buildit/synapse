const d3 = require('d3');
import React from 'react';
import yScaleCreator from './y-scale';
import dateScaleCreator from './date-scale-creator';
import parseTime from './parse-time';
import renderProjection from './renderProjection';
import moment from 'moment';
import makePoints from '../../../helpers/makePoints';

export default class StatusChart extends React.Component {
  constructor(props) {
    super(props);
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
    this.state = { isProjectionVisible: false };
    this.dateScale = dateScaleCreator();
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

    this.updateDateScale();

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
  }

  setDateAxis(yOffset = 0, data, categories, name) {
    const height = this.getSize().height;

    this.vis.append('g')
      .attr('class', 'axis-container')
      .attr('transform', `translate(0, ${height + 20 + yOffset})`)
        .append('g')
        .attr('class', 'axis axis--date')
        .attr('id', name)
        .call(d3.axisBottom(this.dateScale));
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

    this.updateProjection();
  }

  updateArea(yOffset, data = [], categories, chartID) {
    const yScale = yScaleCreator(yOffset, data, categories);

    const area = d3.area()
      // curve(d3.curveCardinal)
      .x(d => this.dateScale(parseTime(d.data.date)))
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

  updateDateScale() {
    const width = this.getSize().width;
    const demandDates = this.props.data.map(datapoint => datapoint.date);
    const defectDates = this.props.defectStatus.map(datapoint => datapoint.date);
    const effortDates = this.props.effortStatus.map(datapoint => datapoint.date);
    const projectionStartDate =
      moment(this.props.projection.startDate, 'YYYY MM DD').format('DD-MMM-YY');
    const projectionPoints = makePoints(this.props.projection, projectionStartDate);
    const projectionDates = projectionPoints.map(datapoint => datapoint.date);

    let allDates = [].concat(demandDates, defectDates, effortDates);

    if (this.state.isProjectionVisible) {
      allDates = allDates.concat(projectionDates);
    }
    this.dateScale = dateScaleCreator(allDates, width);
  }

  updateLine(yOffset, data = [], categories, chartID) {
    const yScale = yScaleCreator(yOffset, data, categories);

    const area = d3.area()
      .curve(d3.curveBasis)
      .x(d => this.dateScale(parseTime(d.data.date)))
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
        .style('stroke-width', 1)
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
    const yScale = yScaleCreator(0, this.props.data, this.props.demandCategories);
    const onShowProjectionClick = () => {
      const isProjectionVisible = !this.state.isProjectionVisible;
      this.setState({
        isProjectionVisible,
      });
    };
    if (this.props.hasProjection) {
      renderProjection({
        data: this.props.projection,
        yScale,
        dateScale: this.dateScale,
        onShowProjectionClick,
        isProjectionVisible: this.state.isProjectionVisible,
      });
    }
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
  projection: React.PropTypes.object,
  hasProjection: React.PropTypes.bool.isRequired,
};

StatusChart.defaultProps = {
  padding: { top: 40, right: 30, bottom: 160, left: 70 },
};
