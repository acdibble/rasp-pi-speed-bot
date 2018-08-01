import Twitter from 'twitter';

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY_PUBLIC,
  consumer_secret: process.env.TWITTER_CONSUMER_API_KEY_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_PUBLIC,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

function composeTweet(tweetParams) {
  const tweetContent = { status: `On ${tweetParams.timestamp}, a speed test was done, and our speeds were only ${tweetParams.speed} but they should be 1000mbps :(` };
  twitterClient.post('statuses/update', tweetContent, (err) => {
    console.log('Error posting tweet:', err);
  });
}

export default composeTweet;
