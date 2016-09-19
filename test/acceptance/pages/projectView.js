import { By, until } from 'selenium-webdriver';
import { url } from '../global';

export default class ProjectView {
  constructor(driver) {
    // const projectNameUrlEncoded = 'Test%20Project%201';
    const projectName = 'Test Project 1';
    this.url = `${url}/${projectName}`;
    this.elements = {
      projectView: By.css('.project-view'),
      editLink: By.css(`a[href="${projectName}/edit"]`),
      projectionLink: By.css(`a[href="${projectName}/projection"]`),
      statusLink: By.css(`a[href="${projectName}/status"]`),
    };
    driver.manage().timeouts().implicitlyWait(10000);
    this.driver = driver;
  }

  waitUntilReady() {
    return this.driver.wait(until.elementLocated(this.elements.projectView), 10000);
  }

  navigate() {
    this.driver.navigate().to(this.url);
    return this.waitUntilReady();
  }

  hasProjectView() {
    return this.driver.findElement(this.elements.projectView).isDisplayed();
  }

  hasEditLink() {
    return this.driver.findElement(this.elements.editLink).isDisplayed();
  }

  hasProjectionLink() {
    return this.driver.findElement(this.elements.projectionLink).isDisplayed();
  }

  hasStatusLink() {
    return this.driver.findElement(this.elements.statusLink).isDisplayed();
  }
}
