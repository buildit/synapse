import { expect } from 'chai';
import ProjectViewPage from '../pages/projectView';
import { driver } from '../global';

describe('Project View Page', () => {
  const projectViewPage = new ProjectViewPage(driver);

  beforeEach(() => projectViewPage.navigate());

  /* eslint-disable no-unused-expressions */
  it('Shows the project view screen', function* foo() {
    expect(yield projectViewPage.hasProjectView()).to.be.true;
    expect(yield projectViewPage.hasEditLink()).to.be.true;
    expect(yield projectViewPage.hasProjectionLink()).to.be.true;
    expect(yield projectViewPage.hasStatusLink()).to.be.true;
  });
  /* eslint-enable no-unused-expressions */
});
