const config = require("./db");
const Feed = require("rss-to-json");
var apecricket = require("ape-cricket");
const fetch = require("node-fetch");
const Twitter = require("twitter");
const parser = require("xml2json");

var client = new Twitter({
  consumer_key: "9MzzQgdcQWmRckmseqkXZg4uZ",
  consumer_secret: "2ABcRhCAFHxmjTOKeUrtlcmnKdM3YQmPKyGwqjxHE3X1lcKenK",
  access_token_key: "153031481-2GPSsXo1hjhaFMvJ8lAd9BScrRqvsYdYw1MlMeCj",
  access_token_secret: "qBxb9n9Eg7ML69Zdc5sgWeiP3Afr0UGEwvcSmKLzYeYvF",
});

const findCity = (state) => {
  switch (state) {
    case "AP":
      return `https://www.newindianexpress.com/States/Andhra-Pradesh/rssfeed/?id=173&getXmlFeed=true&v=${Date.now()}`;
    case "DL":
      return "https://www.newindianexpress.com/Cities/Mumbai/rssfeed/?id=341&getXmlFeed=true";
    case "KA":
      return "https://www.newindianexpress.com/States/Karnataka/rssfeed/?id=175&getXmlFeed=true";
    case "MH":
      return "https://www.newindianexpress.com/Cities/Mumbai/rssfeed/?id=341&getXmlFeed=true";
    case "OR":
      return "https://www.newindianexpress.com/States/Odisha/rssfeed/?id=179&getXmlFeed=true";
    case "GJ":
      return "https://www.newindianexpress.com/Cities/Ahmedabad/rssfeed/?id=343&getXmlFeed=true";
    case "KL":
      return "https://www.newindianexpress.com/States/Kerala/rssfeed/?id=178&getXmlFeed=true";
    case "TN":
      return "https://www.newindianexpress.com/States/Tamil-Nadu/rssfeed/?id=177&getXmlFeed=true";
    case "TS":
      return "https://www.newindianexpress.com/States/Telangana/rssfeed/?id=174&getXmlFeed=true";
    case "WB":
      return "https://www.newindianexpress.com/Cities/Kolkata/rssfeed/?id=342&getXmlFeed=true";
    default:
      "https://www.newindianexpress.com/Cities/Mumbai/rssfeed/?id=341&getXmlFeed=true";
  }
};
var api_key = "Gdz1eCrhT6RjoCjTLVXvoMcaHEf2";
module.exports = async (app, io) => {
  app.get("/newsfr", async (req, res) => {
    Feed.load("https://www.france24.com/en/france/rss", function (err, rss) {
      //console.log("hulala", JSON.stringify(rss, null, 3));
      res.send(JSON.stringify(rss, null, 3));
    });
  });
  app.get("/newsfrlocal", async (req, res) => {
    Feed.load("https://feeds.thelocal.com/rss/fr", function (err, rss) {
      //console.log("hulala", JSON.stringify(rss, null, 3));
      res.send(JSON.stringify(rss, null, 3));
    });
  });
  app.get("/newsindia", async (req, res) => {
    Feed.load(
      `https://www.newindianexpress.com/Nation/rssfeed/?id=170&v=${Date.now()}`,
      function (err, rss) {
        rss.items.length = 5;
        res.send(rss);
      },
    );
  });
  app.post("/newsregion", async (req, res) => {
    const state = "AP";

    Feed.load(findCity(state), function (err, rss) {
      //console.log("hulala", JSON.stringify(rss, null, 3));
      rss.items.length = 4;
      res.send(rss);
    });
  });

  app.get("/cricketscore", async (req, res) => {
    const state = req.body.state;
    fetch("https://nbharat.com/cricket.json")
      .then((res) => res.json())
      .then((body) => {
        console.log("body", body);
        apecricket.cricketScore(api_key, body.matchId, function (response) {
          // response will be json data of upcoming cricket matches
          //console.log("heavy", response);

          res.send(response);
        });
      });
  });

  app.get("/covid19", async (req, res) => {
    fetch("https://covid-19.dataflowkit.com/v1")
      .then((res) => res.json())
      .then((body) => {
        const data = {
          india: body && body.find((item) => item.Country_text == "India"),
          france: body && body.find((item) => item.Country_text == "France"),
        };
        res.send(data);
      });
  });
  app.get("/embassytweets", async (req, res) => {
    client.get(
      "statuses/user_timeline",
      {
        user_id: 1409687894,
        count: 4,
        tweet_mode: "extended",
        retweeted: false,
        retweet_count: 0,
        exclude: "replies",
        exclude: "retweets",
        include_rts: false,
        exclude_replies: true,
      },
      (error, tweets, response) => {
        //console.log("tweets", tweets);
        res.send(tweets);
      },
    );
  });
};
