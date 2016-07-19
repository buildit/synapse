module.exports = (array, category) => {
  let result = false;
  array.forEach((item, index) => {
    if (item.name === category) {
      result = index;
    }
  });
  return result;
};
