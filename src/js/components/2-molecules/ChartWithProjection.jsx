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
      width: 1140
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
    xAxis: {
      type: 'datetime',
      min: startDateInMS,
      max: endDateInMS,
      title: {
        text: '',
      },
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      gridLineWidth: 0,
      title: {
        text: yLabel,
      },
      labels: {
        enabled: false,
      },
    },
    series: data,
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
  $('#projectonButton').click(() => {
    console.log("click")
    $('#overlay').toggleClass('showOverlay');
  });
  return (
    <div>
      <div>
        <ReactHighcharts config={config} />
      </div>
      <div className="projectionOverlay" id="overlay">
        <ReactHighcharts config={configOverlay} />
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
