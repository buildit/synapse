module.exports = (y, height) => {
  if (y > height * 0.7) { return 'top'; }
  if (y < height * 0.3) { return 'bottom'; }
  return 'middle';
};
