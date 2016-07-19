import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';

const Chart = ({ data, title }) => {
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
