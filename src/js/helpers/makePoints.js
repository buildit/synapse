const makePoints = projection => {
  const {
    backlogSize,
    darkMatter,
    periodStart,
    periodEnd,
    velocityStart,
    velocityMiddle,
    velocityEnd,
  } = projection;

  const backlogSizeWithDarkMatter = backlogSize + backlogSize * (darkMatter / 100);

  const periodMiddle =
  (backlogSizeWithDarkMatter - (velocityStart * periodStart) - (velocityEnd * periodEnd)) / velocityMiddle;

  const p0 = () => ({
    x: 0,
    y: 0,
  });

  const p1 = () => ({
    x: periodStart,
    y: velocityStart * periodStart,
  });

  const p2 = () => ({
    x: periodStart + periodMiddle,
    y: p1().y + velocityMiddle * periodMiddle,
  });

  const p3 = () => ({
    x: periodStart + periodMiddle + periodEnd,
    y: p2().y + velocityEnd * periodEnd,
  });

  return [
    p0(),
    p1(),
    p2(),
    p3(),
  ];
};

module.exports = makePoints;
