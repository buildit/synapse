const trimFormInputs = require('../src/js/helpers/trimFormInputs');
/* eslint-disable no-unused-vars */
const should = require('chai').should();
/* eslint-enable no-unused-vars */

describe('Form inputs trimmer', () => {
  it('For demand header, it removes extra spaces from the end of an input string', () => {
    const rawProjectFromForm = {
      name: 'Jasper',
      demand: {
        source: 'The moon   ',
      },
    };
    const trimmedInput = trimFormInputs(rawProjectFromForm);
    trimmedInput.should.have.deep.property('demand.source', 'The moon');
  });

  it('For defect header, it removes extra spaces from the end of an input string', () => {
    const rawProjectFromForm = {
      name: 'Jasper',
      defect: {
        source: 'The sun   ',
      },
    };
    const trimmedInput = trimFormInputs(rawProjectFromForm);
    trimmedInput.should.have.deep.property('defect.source', 'The sun');
  });

  it('For effort header, it removes extra spaces from the end of an input string', () => {
    const rawProjectFromForm = {
      name: 'Jasper',
      effort: {
        source: 'The sun   ',
      },
    };
    const trimmedInput = trimFormInputs(rawProjectFromForm);
    trimmedInput.should.have.deep.property('effort.source', 'The sun');
  });
});
