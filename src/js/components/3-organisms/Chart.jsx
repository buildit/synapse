import React, {
  Component,
  PropTypes,
} from 'react';
import ReactHighcharts from 'react-highcharts';

class Chart extends Component {
  componentDidMount() {
    this.props.fetchStatus();
  }

  render() {
    const config = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Demand',
      },
      xAxis: {
        title: {
          text: 'Date',
        },
      },
      yAxis: {
        title: {
          text: 'Demand',
        },
      },
      // series: [
      //   {
      //     name: 'To do',
      //     data: [5, 6, 3, 2, 1],
      //   },
      //   {
      //     name: 'In progress',
      //     data: [1, 7, 8, 3, 2],
      //   },
      //   {
      //     name: 'Done',
      //     data: [0, 1, 3, 4, 7],
      //   },
      // ],
      series: this.props.status,
      plotOptions: {
        series: {
          stacking: 'normal',
        },
      },
    };
    return (
      <div>
        <ReactHighcharts config={config} />
      </div>
    );
  }
}

Chart.propTypes = {
  fetchStatus: PropTypes.func.isRequired,
  status: PropTypes.array.isRequired,
};

export default Chart;
