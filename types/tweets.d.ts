interface ITweetParams {
    sampleSize: number;
    mean: number;
}

interface ITweet {
    status: string;
}

interface ITweets {
    [key: string]: (arg0: ITweetParams) => ITweet;
}

export { ITweetParams, ITweet, ITweets };
