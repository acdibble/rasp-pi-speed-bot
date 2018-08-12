const Twitter: any = require('twitter');
import tweets from './tweets';
import { ITweetParams } from '../../types';

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY_PUBLIC!,
  consumer_secret: process.env.TWITTER_CONSUMER_API_KEY_SECRET!,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_PUBLIC!,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

function composeTweet(tweetParams: ITweetParams, name: string) {
  const tweet = tweets[name](tweetParams);
  twitterClient.post('statuses/update', tweet, (err: Error) => {
    if (err) console.log('Error posting tweet:', err);
  });
}

export default composeTweet;
