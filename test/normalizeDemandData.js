jest.unmock('../src/js/helpers/normalizeDemandData');
import normalizeDemandData from '../src/js/helpers/normalizeDemandData';

describe('Normalizer for demand data', () => {
  const sampleData = [
    {
      projectDate: '2015-12-03',
      status: {
        'To Do': 5,
      },
    },
    {
      projectDate: '2015-12-04',
      status:
      {
        'To Do': 6,
        'In Progress': 2,
      },
    },
    {
      projectDate: '2015-12-05',
      status:
      {
        'To Do': 3,
        'In Progress': 4,
        Done: 2,
      },
    },
    {
      projectDate: '2015-12-06',
      status:
      {
        'To Do': 2,
        Done: 4,
      },
    },
    {
      projectDate: '2015-12-08',
      status:
      {
        'To Do': 0,
        'In Progress': 5,
        Done: 5,
      },
    },
    {
      projectDate: '2015-12-09',
      status:
      {
        'To Do': 5,
      },
    },
  ];
  const normalizedData = normalizeDemandData(sampleData);

  it('is a function', () => {
    expect(typeof normalizeDemandData).toEqual('function');
  });

  it('returns an array of objects', () => {
    expect(typeof normalizedData[0]).toEqual('object');
  });

  it('every data point has a name key', () => {
    expect(normalizedData[0].name).toBeDefined();
  });

  it('every data point has a data key', () => {
    expect(normalizedData[0].data).toBeDefined();
  });

  xit('the data is an array of numbers', () => {
    const firstDataPoint = normalizedData[0];
    expect(firstDataPoint).toEqual(5);
  });

  xit('the length of data matches the length of the project', () => {
    const sampleDataSorted = sampleData.sort((a, b) => (
      new Date(a.projectDate) - new Date(b.projectDate)
    ));
    const dateRangeInMS =
      new Date(sampleDataSorted[sampleDataSorted.length - 1].projectDate) -
      new Date(sampleDataSorted[0].projectDate);

    const dateRangeInDays = Math.floor(dateRangeInMS / (24 * 60 * 60 * 1000));

    expect(dateRangeInDays).toEqual(normalizedData[0].data.length);
  });

  xit('returns a data array for every status represented in the data', () => {
    //
  });

  xit('returns a date for every item in the data series', () => {
    //
  });

  xit('all "data" arrays are of the same length', () => {
    //
  });
});
