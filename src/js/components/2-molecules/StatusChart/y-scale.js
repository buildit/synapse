const d3 = require('d3');
import sumValues from 'sum-values-in-object';

const y = (yOffset = 0, data = [], categories = []) => {
  const maxes = data.map(dataPoint => sumValues(dataPoint, categories));
  const yMax = maxes.reduce((max, currentItem) => (max > currentItem ? max : currentItem), 0);
  return d3.scaleLinear()
    .domain([yMax, 0])
    .range([yOffset, yOffset + 300]); // Not right. Need to pass in height of individual chart
};


export default y;
