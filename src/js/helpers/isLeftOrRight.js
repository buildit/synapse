module.exports = (x, width) => {
  if (x > width * 0.7) { return 'right'; }
  if (x < width * 0.3) { return 'left'; }
  return 'middle';
};
