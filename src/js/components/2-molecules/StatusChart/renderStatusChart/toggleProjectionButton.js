module.exports = (projectionButton, isProjectionVisible) => {
  if (isProjectionVisible) {
    projectionButton.text('Hide projection');
  } else {
    projectionButton.text('Show projection');
  }
};
