const Twitter = require('twitter');
const tweets = require('./tweets');

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY_PUBLIC,
  consumer_secret: process.env.TWITTER_CONSUMER_API_KEY_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_PUBLIC,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const composeTweet = (tweetParams, name) => new Promise((resolve, reject) => {
  const tweet = tweets[name](tweetParams);
  twitterClient.post('statuses/update', tweet, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve('tweet sent');
    }
  });
});

module.exports = composeTweet;
