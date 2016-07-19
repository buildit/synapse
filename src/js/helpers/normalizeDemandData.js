const categoryExists = require('./categoryExists');
const findIndexOfCategory = require('./findIndexOfCategory');

const normalizeDemandData = data => (
  data.reduce((previous, current) => {
    const categories = Object.keys(current.status);
    categories.forEach(category => {
      if (!categoryExists(previous, category)) {
        previous.push({
          name: category,
          data: [],
        });
      }
      const value = current.status[category];
      if (value) {
        const index = findIndexOfCategory(previous, category);
        // Not sure why we'd ever have an undefined index at this point.
        // But seems we encounter it sometimes.
        if (previous[index]) {
          previous[index].data.push(value);
        }
      }
    });

    return previous;
  }, [])
);

export default normalizeDemandData;
