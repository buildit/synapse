import { By, until } from 'selenium-webdriver';
import { url } from './global';

export default class PageBase {
  constructor(driver) {
    this.baseUrl = url;
    // fixme: make it configurable
    // (it's ok unless we're going to change/disable local auth strategy)
    this.testUser = 'testuser@test.com';
    this.testPass = 'testpass';

    this.elements = {
      login: By.css('.login .link'),
      loginForm: By.css('.login-form'),
    };
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

  hasLogin() {
    return this.hasElement(this.elements.login);
  }

  isLoggedIn() {
    return this.hasLogin() && this.driver
      .findElement(this.elements.login).getText()
      .then(text => text === 'Logout');
  }

  navigate() {
    this.driver.navigate().to(this.url);
    return this.waitUntilReady();
  }

  login() {
    if (!this.hasLogin()) {
      throw new Error('no login button');
    }
    this.driver.findElement(this.elements.login).click();
    const form = this.locateElement(this.elements.loginForm);
    return form.findElement(By.id('email')).sendKeys(this.testUser)
      .then(form.findElement(By.id('password')).sendKeys(this.testPass))
      .then(form.findElement(By.xpath('//span[contains(.,\'Login\')]')).click())
      .then(this.hasNoElement(this.elements.loginForm));
  }

  logout() {
    this.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        this.driver.findElement(this.elements.login).click();
        this.waitForCondition(() => !this.isLoggedIn());
      }
    });
  }

  hasElement(element) {
    return this.driver.findElement(element)
      .isDisplayed()
      .catch(() => false);
  }

  hasNoElement(element) {
    return this.driver.wait(
      () => this.driver.findElements(element).then(arr => arr.length === 0));
  }

  waitForCondition(condition) {
    return this.driver.wait(condition);
  }

  locateElement(element, delay = 10000) {
    return this.driver.wait(until.elementLocated(element), delay);
  }

  messageContent() {
    return this.driver.findElement(By.css('.message-bar .message-text')).getText();
  }
  messageState() {
    const messageBar = this.driver.findElement(By.css('.message-bar'));
    return messageBar.getAttribute('class').then(
      (classes) => (classes.match('error') ? 'error' : 'success')
    );
  }


}
