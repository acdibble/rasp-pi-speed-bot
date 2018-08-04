import chai from 'chai';
import tweets from '../../src/twitter-api/tweets';

const should = chai.should();

describe('tweet templates', () => {
  it('should return pastHour tweet', () => {
    const tweetParams = {
      sampleSize: 6,
      mean: 100.0,
    };
    const name = 'pastHour';
    const text = tweets[name](tweetParams);
    text.status.should.equal('Calculated our average speed from the past hour (6 samples): 100.0mbps, but we are paying for 1000mbps. #ATTDoesNotCare #ATTCaresAboutMoney');
  });
  it('should return pastDay tweet', () => {
    const tweetParams = {
      sampleSize: 6,
      mean: 100,
    };
    const name = 'pastDay';
    const text = tweets[name](tweetParams);
    text.status.should.equal('Calculated our average speed from the past day (6 samples): only 100.0mbps. Sad! #MakeATTCareAgain');
  });
});
