import 'jsdom-global/register';
import {
  Config,
  STAGING,
  DEVELOPMENT,
  PRODUCTION,
  DEVELOPMENT_ENDPOINT,
  STAGING_PREFIX,
  PRODUCTION_PREFIX,
} from 'helpers/config';
import { expect } from 'chai';

describe('config manager', () => {
  global.process.env.EOLAS_DOMAIN = 'example.com';

  it('handles localhost without TEST_API environment', () => {
    const devConfig = new Config(DEVELOPMENT);
    expect(devConfig.apiBaseUrl).to.equal(DEVELOPMENT_ENDPOINT);
    expect(devConfig.starterProjectsBaseApiUrl).to.equal(DEVELOPMENT_ENDPOINT);
  });

  it('handles localhost with TEST_API environment', () => {
    const testDevConfig = new Config(DEVELOPMENT);
    const testApiValue = 'foo';
    global.process.env.TEST_API = testApiValue;
    expect(testDevConfig.apiBaseUrl).to.equal(testApiValue);
    expect(testDevConfig.starterProjectsBaseApiUrl).to.equal(testApiValue);
  });

  it('handles staging', () => {
    const stagingConfig = new Config(STAGING);
    const stagingEndpoint = `${STAGING_PREFIX}${process.env.EOLAS_DOMAIN}/`;
    expect(stagingConfig.apiBaseUrl).to.equal(stagingEndpoint);
    expect(stagingConfig.starterProjectsBaseApiUrl).to.equal(stagingEndpoint);
  });

  it('handles production', () => {
    const productionConfig = new Config(PRODUCTION);
    const productionEndpoint = `${PRODUCTION_PREFIX}${process.env.EOLAS_DOMAIN}/`;
    expect(productionConfig.apiBaseUrl).to.equal(productionEndpoint);
    expect(productionConfig.starterProjectsBaseApiUrl).to.equal(productionEndpoint);
  });
});
