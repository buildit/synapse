import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';

const LineChart = ({ title, yName }) => {
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
        text: yName,
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
    series: [{
      name: 'Defect',
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
      data: [
                [Date.UTC(1970, 9, 21), 10],
                [Date.UTC(1970, 10, 4), 20.28],
                [Date.UTC(1970, 10, 9), 0.25],
                [Date.UTC(1970, 10, 27), 0.2],
                [Date.UTC(1970, 11, 2), 0.28],
                [Date.UTC(1970, 11, 26), 0.28],
                [Date.UTC(1970, 11, 29), 0.47],
                [Date.UTC(1971, 0, 11), 0.79],
                [Date.UTC(1971, 0, 26), 0.72],
                [Date.UTC(1971, 1, 3), 1.02],
                [Date.UTC(1971, 1, 11), 1.12],
                [Date.UTC(1971, 1, 25), 1.2],
                [Date.UTC(1971, 2, 11), 1.18],
                [Date.UTC(1971, 3, 11), 1.19],
                [Date.UTC(1971, 4, 1), 1.85],
                [Date.UTC(1971, 4, 5), 2.22],
                [Date.UTC(1971, 4, 19), 1.15],
                [Date.UTC(1971, 5, 3), 0],
      ],
    }],
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
  yName: PropTypes.string.isRequired,
};

export default LineChart;
