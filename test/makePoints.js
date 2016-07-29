const assert = require('chai').assert;
const makePoints = require('../src/js/helpers/makePoints');

describe('Projection chart points maker', () => {
  const projection1 = {
    backlogSize: 100,
    darkMatter: 0,
    iterationLength: 0,

    periodStart: 2,
    periodEnd: 2,

    velocityStart: 4,
    velocityMiddle: 8,
    velocityEnd: 4,
  };

  const points1 = makePoints(projection1);

  it('is a function', () => {
    assert.equal(typeof makePoints, 'function');
  });

  it('makes four points', () => {
    assert.equal(points1.length, 4);
  });

  it('returns a first point with coordinates 0, 0', () => {
    assert.equal(points1[0].x, 0);
    assert.equal(points1[0].y, 0);
  });

  it('returns a second point where x value is equal to periodStart', () => {
    assert.equal(points1[1].x, projection1.periodStart);
  });

  it('returns a second point where y value is equal to periodStart * velocityStart', () => {
    assert.equal(points1[1].y, projection1.periodStart * projection1.velocityStart);
  });

  it(`returns a third point where x value is calculated correctly...
    yeah, not a great name for a test :/`, () => {
    const projection = {
      backlogSize: 6,
      darkMatter: 0,
      iterationLength: 0,

      periodStart: 2,
      periodEnd: 2,

      velocityStart: 1,
      velocityMiddle: 1,
      velocityEnd: 1,
    };
    const points = makePoints(projection);

    assert.equal(points[2].x, 4);
  });

  it('returns a third point where y value is calculated correctly', () => {
    const projection = {
      backlogSize: 6,
      darkMatter: 0,
      iterationLength: 0,

      periodStart: 2,
      periodEnd: 2,

      velocityStart: 1,
      velocityMiddle: 1,
      velocityEnd: 1,
    };
    const points = makePoints(projection);

    assert.equal(points[2].y, 4);
  });

  it('returns the correct end point', () => {
    const projection = {
      backlogSize: 6,
      darkMatter: 0,
      iterationLength: 0,

      periodStart: 2,
      periodEnd: 2,

      velocityStart: 1,
      velocityMiddle: 1,
      velocityEnd: 1,
    };
    const points = makePoints(projection);

    assert.equal(points[3].x, 6);
    assert.equal(points[3].y, 6);
  });
});
