const Twitter = require("twitter");
const MsTranslator = require("mstranslator");
const Tweets = require("./models/tweets");

module.exports = (app, io) => {
  var client = new Twitter({
    consumer_key: "9MzzQgdcQWmRckmseqkXZg4uZ",
    consumer_secret: "2ABcRhCAFHxmjTOKeUrtlcmnKdM3YQmPKyGwqjxHE3X1lcKenK",
    access_token_key: "153031481-2GPSsXo1hjhaFMvJ8lAd9BScrRqvsYdYw1MlMeCj",
    access_token_secret: "qBxb9n9Eg7ML69Zdc5sgWeiP3Afr0UGEwvcSmKLzYeYvF",
  });

  var translateMs = new MsTranslator(
    {
      api_key: "48b3cf0b73cf4002a79bdd90a2928dcd",
    },
    true,
  );

  client.stream("statuses/filter", { follow: 153031481 }, (stream) => {
    stream.on("data", (tweet) => {
      console.log("tweets", tweet.text);
      const params = {
        text: tweet.text,
        from: "fr",
        to: "en",
      };
      translateMs.translate(params, function (err, data) {
        const saveTweet = new Tweets({
          tweetText: data,
          timeStamp: Date.now(),
        });
        saveTweet.save();
      });
    });
  });
  const addTweetsToDb = () => {
    sendNotificationAndroid();
    sendNotificationIos();
  };

  const sendNotificationAndroid = (text) => {};

  const sendNotificationIos = () => {};
};
