module.exports = (projectionButton, isProjectionVisible) => {
  if (isProjectionVisible) {
    projectionButton.select('text')
      .text('Hide projection');
  } else {
    projectionButton.select('text')
      .text('Show projection');
  }
};
