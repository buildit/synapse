import { By, until } from 'selenium-webdriver';
import { url } from '../global';

export default class HomePage {
  constructor(driver) {
    this.url = `${url}/`;
    this.elements = {
      app: By.css('#app'),
      table: By.css('.table'),
      button: By.css('button'),
      projectWithName: (name) => By.css(`a[href="${name}"]`),
    };
    this.driver = driver;
  }

  waitUntilReady() {
    return this.driver.wait(until.elementLocated(this.elements.app));
  }

  navigate() {
    this.driver.navigate().to(this.url);
    return this.waitUntilReady();
  }

  hasApp() {
    return this.driver.findElement(this.elements.app).isDisplayed();
  }

  hasTable() {
    return this.driver.findElement(this.elements.table).isDisplayed();
  }

  hasButton() {
    return this.driver.findElement(this.elements.button).isDisplayed();
  }

  selectProject(name) {
    const namedProject = this.driver.wait(
      until.elementLocated(this.elements.projectWithName(name)), 10000);
    return namedProject.click();
  }
}
