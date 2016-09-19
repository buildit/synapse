import { expect } from 'chai';
import HomePage from '../pages/home';
import ProjectViewPage from '../pages/projectView';
import { driver } from '../global';

describe('Home Page', () => {
  const homePage = new HomePage(driver);
  const projectViewPage = new ProjectViewPage(driver);

  beforeEach(() => homePage.navigate());

  /* eslint-disable no-unused-expressions */
  it('Shows the home screen', function* foo() {
    expect(yield driver.getTitle()).to.equal('Synapse');
    expect(yield homePage.hasApp()).to.be.true;
    expect(yield homePage.hasTable()).to.be.true;
    expect(yield homePage.hasButton()).to.be.true;
  });

  it('Can navigate to the Project View page', function* foo() {
    // setup
    const projectName = 'Test Project 1';

    // act
    homePage.selectProject(projectName);

    // assert
    expect(yield projectViewPage.hasProjectView()).to.be.true;
  });
  /* eslint-enable no-unused-expressions */
});
