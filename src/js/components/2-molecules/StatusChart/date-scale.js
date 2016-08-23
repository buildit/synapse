const d3 = require('d3');
import parseTime from './parse-time';

const dateScaleCreator = (yOffset = 0, data = [], width) => {
  const dates = data.map(datapoint => parseTime(datapoint.date));
  return d3.scaleTime()
    .domain(d3.extent(dates))
    .range([0, width]);
};


export default dateScaleCreator;
