import { expect } from 'chai';
import HomePage from '../pages/home';
import { driver } from '../global';

describe('Home Page', () => {
  const homePage = new HomePage(driver);

  beforeEach(() => homePage.navigate());

  /* eslint-disable no-unused-expressions */
  it('Shows the home screen', function* foo() {
    expect(yield driver.getTitle()).to.equal('Synapse');
    expect(yield homePage.hasApp()).to.be.true;
    expect(yield homePage.hasTable()).to.be.true;
  });
  /* eslint-enable no-unused-expressions */
});
