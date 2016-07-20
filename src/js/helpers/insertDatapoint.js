module.exports = (dataSeries, filler, index) => (
  dataSeries.slice(0, index + 1)
    .concat(filler)
    .concat(dataSeries.slice(index + 1))
);
