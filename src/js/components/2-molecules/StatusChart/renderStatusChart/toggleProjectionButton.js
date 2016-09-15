module.exports = (projectionButton, isProjectionVisible) => {
  isProjectionVisible ?
    projectionButton.text('Hide projection') :
    projectionButton.text('Show projection');
};
