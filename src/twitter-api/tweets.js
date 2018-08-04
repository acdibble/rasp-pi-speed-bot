const tweets = {
  pastHour: params => ({
    status: `Calculated our average speed from the past hour (${params.sampleSize} samples): ${params.mean.toFixed(1)}mbps, but we are paying for 1000mbps. #ATTDoesNotCare #ATTCaresAboutMoney`,
  }),
  pastDay: params => ({
    status: `Calculated our average speed from the past day (${params.sampleSize} samples): only ${params.mean.toFixed(1)}mbps. Sad! #MakeATTCareAgain`,
  }),
};

export default tweets;
