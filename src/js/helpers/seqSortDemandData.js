module.exports = (sortData) => {
  const flowCategories = sortData;
  const seqResult = [];
  for (const value of flowCategories) {
    seqResult.push({
      name: value.name,
      sequence: value.sequence - 1,
    });
  }
  return seqResult;
};
