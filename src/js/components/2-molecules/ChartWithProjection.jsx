import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';
import $ from 'jquery';
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

const ChartWithProjection = ({
  data,
  projectionData,
  title,
  yLabel = '',
  startDateInMS,
  endDateInMS }) => {
  const config = {
    chart: {
      type: 'area',
    },
    plotOptions: {
      series: {
        stacking: 'normal',
      },
      area: {
        events: {
           legendItemClick: function () {
             return false; // <== returning false will cancel the default action
           },
        },
      },
    },
    title: {
      text: title,
    },
    xAxis: {
      type: 'datetime',
      min: startDateInMS,
      max: endDateInMS,
    },
    series: data,
    credits: {
      enabled: false,
    },
  };
  const configOverlay = {
    chart: {
      type: 'spline',
      backgroundColor: null,
      width: 600,
      height: 200,
    },
    plotOptions: {
      marker: {
        enabled: false,
      },
      area: {
        events: {
           legendItemClick: function () {
             return false; // <== returning false will cancel the default action
           },
        },
      },
      title: {
        text: '',
      },
    },
    yAxis: {
      gridLineWidth: 0,
      title: {
        text: yLabel,
      },
    },
    series: [{
      data: [
                [projectionData[0].x, projectionData[0].y],
                [projectionData[1].x, projectionData[1].y],
                [projectionData[2].x, projectionData[2].y],
                [projectionData[3].x, projectionData[3].y],
      ],
    }],
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };
  if (data.length < 1) {
    return <div>There is no {title} data for this project.</div>;
  }
  return (
    <div>
      <div>
        <ReactHighcharts config={config} />
      </div>
    </div>
  );
};

ChartWithProjection.propTypes = {
  data: PropTypes.array.isRequired,
  projectionData: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  yLabel: PropTypes.string,
  startDateInMS: PropTypes.number.isRequired,
  endDateInMS: PropTypes.number.isRequired,
};

export default ChartWithProjection;
