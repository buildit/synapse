const keyInList = (key, list) => (list.filter(item => (item === key)).length > 0);

module.exports = (list, ids) => {
  const result = [];

  for (let i = 0; i < list.length; i++) {
    if (!keyInList(list[i].id, ids)) {
      result.push(list[i]);
    }
  }

  return result;
};
