import { expect } from 'chai';
import ProjectPage from '../pages/project';
import ProjectEditPage from '../pages/projectEdit';
import { driver } from '../global';

describe('Project View Page', () => {
  const projectPage = new ProjectPage(driver);
  const projectEditPage = new ProjectEditPage(driver);

  beforeEach(() => projectPage.navigate());

  /* eslint-disable no-unused-expressions */
  it('Shows the project view screen', function* foo() {
    expect(yield projectPage.hasProjectView()).to.be.true;
    expect(yield projectPage.hasEditLink()).to.be.true;
    expect(yield projectPage.hasProjectionLink()).to.be.true;
    expect(yield projectPage.hasStatusLink()).to.be.true;
  });

  it('Can navigate to the Project Edit page', function* foo() {
    projectPage.clickEditProject();

    // assert
    expect(yield projectEditPage.hasProjectEdit()).to.be.true;
  });
  /* eslint-enable no-unused-expressions */
});
