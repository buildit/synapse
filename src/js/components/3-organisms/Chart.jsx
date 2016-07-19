import React, {
  Component,
  PropTypes,
} from 'react';
import ReactHighcharts from 'react-highcharts';

class Chart extends Component {
  componentDidMount() {
    this.props.fetchStatus(this.props.projectId);
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

    if (this.props.status.length < 1) {
      return <div>There is no status data for project {this.props.projectId}.</div>;
    }
    return (
      <div>
        <ReactHighcharts config={config} />
      </div>
    );
  }
}

Chart.propTypes = {
  fetchStatus: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  status: PropTypes.array.isRequired,
};

export default Chart;
