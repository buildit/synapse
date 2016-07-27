import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';

const LineChart = ({ title, yLabel, data, startDateInMS, endDateInMS }) => {
  const config = {
    chart: {
      type: 'spline',
    },
    title: {
      text: title,
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
      min: startDateInMS,
      max: endDateInMS,
    },
    yAxis: {
      title: {
        text: yLabel,
      },
      min: 0,
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
  if (data.length < 1) {
    return <div>There is no {title} data for this project.</div>;
  }
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
