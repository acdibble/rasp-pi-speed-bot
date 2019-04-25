const { assert } = require('chai');
const tweets = require('../../src/twitter-api/tweets');

describe('Tweets', () => {
  const tweetParams = {
    sampleSize: 6,
    mean: 100,
  };

  it('should return tweet for past hour', () => {
    const tweet = 'pastHour';
    const text = tweets[tweet](tweetParams);
    assert.equal(text.status, 'Calculated our average speed from the past hour (6 samples): 100.0mbps, but we are paying for 1000mbps. #ATTDoesNotCare #ATTCaresAboutMoney');
  });

  it('should return tweet for past day', () => {
    const tweet = 'pastDay';
    const text = tweets[tweet](tweetParams);
    assert.equal(text.status, 'Calculated our average speed from the past day (6 samples): only 100.0mbps. Sad! #MakeATTCareAgain');
  });
});
