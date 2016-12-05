import { By, until } from 'selenium-webdriver';
import { url } from '../global';

export default class HomePage {
  constructor(driver) {
    this.url = `${url}/`;
    this.elements = {
      app: By.css('#app'),
      table: By.css('.table'),
      button: By.css('button'),
      login: By.css('.login'),
      projectWithName: (name) => By.css(`a[href="${name}"]`),
    };
    this.driver = driver;
  }

  waitUntilReady() {
    return this.driver.wait(until.elementLocated(this.elements.app));
  }

  navigate() {
    /* eslint-disable no-console */
    console.log('this.url:', this.url);
    /* eslint-enable no-console */
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

  hasLogin() {
    return this.driver.findElement(this.elements.login).isDisplayed();
  }

  selectProject(name) {
    const encodedName = encodeURIComponent(name);
    const namedProject = this.driver.wait(
      until.elementLocated(this.elements.projectWithName(encodedName)), 10000);
    return namedProject.click();
  }
}
