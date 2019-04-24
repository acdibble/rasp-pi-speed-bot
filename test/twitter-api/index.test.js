const { assert } = require('chai');
const nock = require('nock');
const composeTweet = require('../../src/twitter-api');

describe('composeTweet', () => {
  beforeEach(nock.cleanAll);

  it('sends a tweet', () => {
    const scope = nock('https://api.twitter.com')
      .post('/1.1/statuses/update.json')
      .reply(200);

    return composeTweet({ mean: 600, sampleSize: 6 }, 'pastHour')
      .then((value) => {
        scope.done();
        assert.equal(value, 'tweet sent');
      });
  });

  it('handles errors', () => {
    const scope = nock('https://api.twitter.com')
      .post('/1.1/statuses/update.json')
      .reply(403);

    return composeTweet({ mean: 600, sampleSize: 6 }, 'pastHour')
      .catch((err) => {
        scope.done();
        assert.exists(err);
      });
  });
});
