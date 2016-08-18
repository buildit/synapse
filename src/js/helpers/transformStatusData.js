import moment from 'moment';

module.exports = ((data, key) => (
  data.map(dataPoint => {
    const date = [
      moment(dataPoint.projectDate).format('DD'),
      moment(dataPoint.projectDate).format('MMM'),
      moment(dataPoint.projectDate).format('YY'),
    ].join('-');

    const transformedDataPoint = {
      date,
    };

    const categories = Object.keys(dataPoint[key]);

    categories.forEach(category => {
      transformedDataPoint[category] = dataPoint[key][category];
    });

    return transformedDataPoint;
  })
));
