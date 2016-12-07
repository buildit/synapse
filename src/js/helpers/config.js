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

export class Config {

  constructor(environment = '') {
    this.environment = this.determineEnvironment(environment);
    this.computedBaseUrl = undefined;
  }

  determineEnvironment(environment) {
    let currentEnv;
    if (environment.includes('staging')) {
      currentEnv = STAGING;
    } else if (environment.includes('localhost')) {
      currentEnv = DEVELOPMENT;
    } else {
      currentEnv = PRODUCTION;
    }
    return currentEnv;
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
      this.computedBaseUrl = DEVELOPMENT_ENDPOINT;
    }
    return this.computedBaseUrl;
  }

  authUrl() {
    if (this.environment === STAGING || this.environment === DEVELOPMENT) {
      return 'http://staging.twig-api.riglet/';
    }
    return 'http://twig-api.riglet/';
  }

  get apiBaseUrl() {
    return this.baseUrl();
  }

  get starterProjectsBaseApiUrl() {
    return this.baseUrl();
  }

  get loginUrl() {
    return `${this.authUrl()}login`;
  }
}

const config = new Config(hostname);
export default config;
