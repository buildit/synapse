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
