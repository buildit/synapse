import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
console.log(MILLISECONDS_IN_A_DAY);

const Chart = ({ data, title, startDateInMS, endDateInMS }) => {
  const config = {
    chart: {
      type: 'area',
    },
    title: {
      text: title,
    },
    xAxis: {
      title: {
        text: 'Date',
      },
      type: 'datetime',
      min: startDateInMS,
      max: endDateInMS,
    },
    yAxis: {
      title: {
        text: 'Stories',
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
};

export default Chart;
