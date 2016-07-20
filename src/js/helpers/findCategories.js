module.exports = data => (
  data.reduce((result, current) => {
    const categories = Object.keys(current.status);
    categories.forEach(category => {
      if (result.indexOf(category) < 0) {
        result.push(category);
      }
    });
    return result;
  }, [])
);
