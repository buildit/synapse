import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

const Chart = ({ data, title, yLabel = '', startDateInMS, endDateInMS }) => {
  const config = {
    chart: {
      type: 'area',
    },
    title: {
      text: title,
    },
    xAxis: {
      type: 'datetime',
      min: startDateInMS,
      max: endDateInMS,
    },
    yAxis: {
      title: {
        text: yLabel,
      },
    },
    series: data,
    plotOptions: {
      series: {
        stacking: 'normal',
      },
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
      <ReactHighcharts config={config} />
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  yLabel: PropTypes.string,
  startDateInMS: PropTypes.number.isRequired,
  endDateInMS: PropTypes.number.isRequired,
};

export default Chart;
