module.exports = data => {
  const result = data;
  result.sort((a, b) => (
    new Date(a[0]) - new Date(b[0])
  ));
  return result;
};
