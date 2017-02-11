import { By } from 'selenium-webdriver';
import PageBase from '../pageBase';

export default class HomePage extends PageBase {
  constructor(driver) {
    super(driver);
    this.url = `${this.baseUrl}/`;
    Object.assign(this.elements, {
      app: By.css('#app'),
      table: By.css('.table'),
      button: By.css('button'),
      projectWithName: (name) => By.css(`a[href="${name}"]`),
      projectTrashcan: (name) => By.css(`[data-project="${name}"]`),
    });

    this.readyElement = this.elements.app;
  }

  hasApp() {
    return this.hasElement(this.elements.app);
  }

  hasTable() {
    return this.hasElement(this.elements.table);
  }

  hasButton() {
    return this.hasElement(this.elements.button);
  }


  hasProjectTrashcan(name) {
    return this.hasElement(this.elements.projectTrashcan(name));
  }

  selectProject(name) {
    const encodedName = encodeURIComponent(name);
    const namedProject = this.locateElement(this.elements.projectWithName(encodedName));
    return namedProject.click();
  }

  deleteProject(name) {
    const namedProject = this.locateElement(this.elements.projectTrashcan(name));
    namedProject.click();
    return this.hasNoElement(this.elements.projectTrashcan(name));
  }
}
