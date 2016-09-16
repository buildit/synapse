import { By, until } from 'selenium-webdriver';
import { url } from '../global';

export default class ProjectView {
  constructor(driver) {
    this.url = `${url}/TEST1`;
    this.elements = {
      projectView: By.css('.project-view'),
      editLink: By.css('a[href="TEST1/edit"]'),
      projectionLink: By.css('a[href="TEST1/projection"]'),
      statusLink: By.css('a[href="TEST1/status"]'),
    };
    this.driver = driver;
  }

  waitUntilReady() {
    return this.driver.wait(until.elementLocated(this.elements.projectView));
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
