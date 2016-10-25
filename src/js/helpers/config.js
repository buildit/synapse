const hostname = typeof window === 'undefined' ? 'localhost' : window.location.hostname;
/* eslint-disable no-console */
console.log('hostname:', hostname);
/* eslint-enable no-console */

export const STAGING = 'staging';
export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';

export const DEVELOPMENT_ENDPOINT = 'http://localhost:6565/';
export const STAGING_PREFIX = 'http://eolas.staging.';
export const PRODUCTION_PREFIX = 'http://eolas.';

let browserEnvironment = '';
if (hostname.includes('staging')) {
  browserEnvironment = STAGING;
} else if (hostname.includes('localhost')) {
  browserEnvironment = DEVELOPMENT;
} else {
  browserEnvironment = PRODUCTION;
}

export class Config {

  constructor(environment) {
    this.environment = environment;
    this.computedBaseUrl = undefined;
  }

  baseUrl() {
    try {
      if (!this.computedBaseUrl) {
        let url;
        const eolasDomain = process.env.EOLAS_DOMAIN;
        if (this.environment === STAGING) {
          url = `${STAGING_PREFIX}${eolasDomain}/`;
        } else if (this.environment === DEVELOPMENT) {
          url = process.env.TEST_API || DEVELOPMENT_ENDPOINT;
        } else {
          url = `${PRODUCTION_PREFIX}${eolasDomain}/`;
        }
        this.computedBaseUrl = url;
      }
    } catch (err) {
      /* eslint-disable no-console */
      console.log(err);
      this.computedBaseUrl = DEVELOPMENT_ENDPOINT;
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

const config = new Config(browserEnvironment);
export default config;
