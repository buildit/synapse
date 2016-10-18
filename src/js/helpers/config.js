const hostname = typeof window === 'undefined' ? 'localhost' : window.location.hostname;
/* eslint-disable no-console */
console.log('hostname:', hostname);
/* eslint-enable no-console */

let environment = '';
const STAGING = 'staging';
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

if (hostname.includes('staging')) {
  environment = STAGING;
} else if (hostname.includes('localhost')) {
  environment = DEVELOPMENT;
} else {
  environment = PRODUCTION;
}

class Config {

  constructor() {
    this.computedBaseUrl = undefined;
  }

  baseUrl() {
    if (!this.computedBaseUrl) {
      let url;
      const eolasDomain = process.env.EOLAS_DOMAIN;
      if (environment === STAGING) {
        url = `http://eolas.staging.${eolasDomain}/`;
      } else if (environment === DEVELOPMENT) {
        url = process.env.TEST_API || 'http://localhost:6565/';
      } else {
        url = `http://eolas.${eolasDomain}/`;
      }
      this.computedBaseUrl = url;
    }
    return this.computedBaseUrl;
  }

  get apiBaseUrl() {
    return this.baseUrl();
  }

  get starterProjectsBaseApiUrl() {
    return this.baseUrl();
  }
}

const config = new Config();
export default config;
