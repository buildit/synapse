import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';

const LineChart = ({ title, yLabel, data }) => {
  const config = {
    chart: {
      type: 'spline',
    },
    title: {
      text: title,
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // don't display the dummy year
        month: '%e. %b',
        year: '%b',
      },
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: yLabel,
      },
      min: 0,
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b}: {point.y:.2f}',
    },

    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: data,
  };
  return (
    <div>
      <ReactHighcharts config={config} />
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
};

export default LineChart;
