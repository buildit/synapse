const expect = require('chai').expect;
const filterListByIds = require('../src/js/helpers/filterListByIds');

describe('List filter', () => {
  it('filters out items that match the ids when ids contains one id', () => {
    const list = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ];

    const ids = [
      'b',
    ];

    const filteredList = filterListByIds(list, ids);

    expect(filteredList).to.deep.equal([
      { id: 'a' },
      { id: 'c' },
    ]);
  });

  it('filters out items that match the ids when ids contains multiple ids', () => {
    const list = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ];

    const ids = [
      'b',
      'c',
    ];

    const filteredList = filterListByIds(list, ids);

    expect(filteredList).to.deep.equal([
      { id: 'a' },
    ]);
  });

  it('filters correctly when ids contains items that do not appear in the list', () => {
    const list = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ];

    const ids = [
      'b',
      'z',
    ];

    const filteredList = filterListByIds(list, ids);

    expect(filteredList).to.deep.equal([
      { id: 'a' },
      { id: 'c' },
    ]);
  });

  it('filters correctly when ids is an empty array', () => {
    const list = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ];

    const ids = [];

    const filteredList = filterListByIds(list, ids);

    expect(filteredList).to.deep.equal([
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ]);
  });
});
