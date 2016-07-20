const findCategories = require('./findCategories');

module.exports = (data) => {
  const result = [];
  const masterCategories = findCategories(data);
  data.forEach(dataPoint => {
    const filledDataPoint = dataPoint;
    const categoriesInDatapoint = Object.keys(dataPoint.status);

    masterCategories.forEach(masterCategory => {
      if (categoriesInDatapoint.indexOf(masterCategory) < 0) {
        filledDataPoint.status[masterCategory] = 0;
      }
    });
    result.push(filledDataPoint);
  });

  return result;
};
