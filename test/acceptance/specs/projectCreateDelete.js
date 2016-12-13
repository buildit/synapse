import { expect } from 'chai';
import HomePage from '../pages/home';
import ProjectNew from '../pages/projectNew';
import ProjectEdit from '../pages/projectEdit';
import { driver } from '../global';
import randomstring from 'randomstring';


describe('Project Creation Process', () => {
  const testProjectName = randomstring.generate();

  const homePage = new HomePage(driver);
  const projectPage = new ProjectNew(driver);
  const projectEdit = new ProjectEdit(driver);

  it('Shows the new project list screen', function* foo() {
    projectPage.navigate();
    expect(yield projectPage.hasProjectList()).to.be.true;
  });

  it('Navigates to the manual creation screen', function* foo() {
    projectPage.selectManual();

    const currentUrl = yield projectPage.driver.getCurrentUrl();
    expect(currentUrl.endsWith('/new-project/edit')).to.equal(true);
  });

  it('Submits a new project', function* foo() {
    projectEdit.fillInName(testProjectName);
    expect(yield projectEdit.nameValue()).to.equal(testProjectName);
    yield projectEdit.saveProject();
  });

  it('Finds the new project in the homepage', function* foo() {
    homePage.navigate();
    homePage.login();
    homePage.navigate();
    expect(yield homePage.hasProjectTrashcan(testProjectName)).to.be.true;
  });

  it('Deletes the new project', function* foo() {
    homePage.deleteProject(testProjectName);
    expect(yield homePage.hasProjectTrashcan(testProjectName)).to.be.false;
  });
});
