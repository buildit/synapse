import { By, until } from 'selenium-webdriver';
import { url } from '../global';

export default class HomePage {
  constructor(driver) {
    this.url = `${url}/`;
    this.elements = {
      app: By.css('#app'),
      table: By.css('.table'),
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
}
