const chai = require('chai');
const tweets = require('../../src/twitter-api/tweets');

const should = chai.should();

describe('Tweets', () => {
  it('should return tweet', () => {
    const tweetParams = {
      sampleSize: 6,
      mean: 100,
    };
    const tweet = 'pastHour';
    const text = tweets[tweet](tweetParams);
    text.status.should.equal(
      'Calculated our average speed from the past hour (6 samples): 100.0mbps, but we are paying for 1000mbps. #ATTDoesNotCare #ATTCaresAboutMoney',
    );
  });
});
