import { until } from 'selenium-webdriver';
import { url } from './global';

export default class PageBase {
  constructor(driver) {
    this.baseUrl = url;

    driver.manage().timeouts().implicitlyWait(10000);
    this.driver = driver;
  }

  waitUntilReady() {
    if (this.readyElement) {
      return this.driver.wait(until.elementLocated(this.readyElement));
    }
    return this.driver.wait();
  }

  clickWhenClickable(element) {
    return this.driver.wait(() =>
      element.click()
        .then(() => true)
        .catch(() => false)
    );
  }

  navigate() {
    /* eslint-disable no-console */
    console.log('this.url:', this.url);
    /* eslint-enable no-console */
    this.driver.navigate().to(this.url);
    return this.waitUntilReady();
  }

  login() {
    const data = JSON.stringify({ name: 'foo@bar.com' });
    return this.driver.executeScript(`window.localStorage.setItem('user','${data}');`);
  }

  hasElement(element) {
    return this.driver.findElement(element)
      .isDisplayed()
      .catch(() => false);
  }

  locateElement(element, delay = 10000) {
    return this.driver.wait(until.elementLocated(element), delay);
  }


}