import request, { RequestCallback } from 'request';
import { ITweet } from '../../types';

class TwitterClient {
    private oauth = {};

    constructor() {
        this.oauth = {
            consumer_key: process.env.TWITTER_CONSUMER_API_KEY_PUBLIC,
            consumer_secret: process.env.TWITTER_CONSUMER_API_KEY_SECRET,
            token: process.env.TWITTER_ACCESS_TOKEN_PUBLIC,
            token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        }
    }

    sendTweet(tweet: ITweet, cb: RequestCallback) {
        const url = `https://api.twitter.com/1.1/statuses/update.json?status=${encodeURIComponent(tweet.status)}`;
        const options = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json',
            },
            oauth: this.oauth,
            qs: tweet,
        };

        request(options, cb);
    }
}

export default TwitterClient;
