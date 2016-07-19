module.exports = (array, category) => {
  const result = array.filter((item) => (
    item.name === category
  ));
  return result.length > 0;
};
