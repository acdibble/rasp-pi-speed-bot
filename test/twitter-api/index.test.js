/* eslint-disable */
import chai from 'chai';
import { twitterClient } from '../../src/twitter-api';

const { expect } = chai;

describe('env variables', () => {
  it('should be defined', () => {
    const { options: {
      consumer_key,
      consumer_secret,
      access_token_key,
      access_token_secret 
    } } = twitterClient;
    expect(consumer_key).to.not.be.undefined;
    expect(consumer_secret).to.not.be.undefined;
    expect(access_token_key).to.not.be.undefined;
    expect(access_token_secret).to.not.be.undefined;
  });
});
