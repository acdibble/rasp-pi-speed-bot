export default function getTweet(tweetParams, tweetName) {
  const tweets = {
    pastHour:
    {
      status: `Calculated our average speed from the past hour (${tweetParams.sampleSize} samples): ${tweetParams.mean}mbps, but we are paying for 1000mbps. #ATTDoesNotCare #MakeATTCareAgain #ATTCaresAboutMoney`,
    },
  };
  return tweets[tweetName];
}
