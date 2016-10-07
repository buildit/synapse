import { By, until } from 'selenium-webdriver';
import { url } from '../global';

export default class ProjectEdit {
  constructor(driver) {
    const projectName = 'Test Project 1';
    this.url = `${url}/${projectName}/edit`;
    this.elements = {
      component: By.css('.edit-project'),
    };
    driver.manage().timeouts().implicitlyWait(10000);
    this.driver = driver;
  }

  waitUntilReady() {
    return this.driver.wait(until.elementLocated(this.elements.component), 10000);
  }

  navigate() {
    /* eslint-disable no-console */
    console.log('this.url:', this.url);
    /* eslint-enable no-console */
    this.driver.navigate().to(this.url);
    return this.waitUntilReady();
  }

  hasProjectEdit() {
    return this.driver.findElement(this.elements.component).isDisplayed();
  }
}
