const hostname = typeof window === 'undefined' ? 'localhost' : window.location.hostname;
/* eslint-disable no-console */
console.log('hostname:', hostname);
/* eslint-enable no-console */

let configFile = '';

if (hostname.includes('staging')) {
  configFile = 'staging';
} else if (hostname.includes('localhost')) {
  configFile = 'default';
} else {
  configFile = 'production';
}

class Config {

  constructor() {
    this.config = undefined;
  }

  loadConfig() {
    /* eslint-disable global-require */
    this.config = require(`config/${configFile}`);
    /* eslint-enable global-require */
  }

  get apiBaseUrl() {
    if (!this.config) {
      this.loadConfig();
    }
    return this.config.parameters.api.baseUrl;
  }

  get starterProjectsBaseApiUrl() {
    if (!this.config) {
      this.loadConfig();
    }
    return this.config.parameters.starterProjectsApi.baseUrl;
  }
}

const config = new Config();
export default config;
