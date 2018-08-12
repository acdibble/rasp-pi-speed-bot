import TwitterClient from './api';
import tweets from './tweets';
import { ITweetParams } from '../../types';

const tc = new TwitterClient();

function composeTweet(tweetParams: ITweetParams, name: string) {
  const tweet = tweets[name](tweetParams);
  tc.sendTweet(tweet, (err: Error) => {
    if (err) console.log('Error posting tweet:', err);
  });
}

export default composeTweet;
