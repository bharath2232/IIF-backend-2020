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

const indiastates = [
  { code: "AN", name: "Andaman and Nicobar Islands", id: 0 },
  { code: "AP", name: "Andhra Pradesh", id: 1 },
  { code: "AR", name: "Arunachal Pradesh", id: 2 },
  { code: "AS", name: "Assam", id: 3 },
  { code: "BR", name: "Bihar", id: 4 },
  { code: "CG", name: "Chandigarh", id: 5 },
  { code: "CH", name: "Chhattisgarh", id: 6 },
  { code: "DH", name: "Dadra and Nagar Haveli", id: 7 },
  { code: "DD", name: "Daman and Diu", id: 8 },
  { code: "DL", name: "Delhi", id: 9 },
  { code: "GA", name: "Goa", id: 10 },
  { code: "GJ", name: "Gujarat", id: 11 },
  { code: "HR", name: "Haryana", id: 12 },
  { code: "HP", name: "Himachal Pradesh", id: 13 },
  { code: "JK", name: "Jammu and Kashmir", id: 14 },
  { code: "JH", name: "Jharkhand", id: 15 },
  { code: "KA", name: "Karnataka", id: 16 },
  { code: "KL", name: "Kerala", id: 17 },
  { code: "LD", name: "Lakshadweep", id: 18 },
  { code: "MP", name: "Madhya Pradesh", id: 19 },
  { code: "MH", name: "Maharashtra", id: 20 },
  { code: "MN", name: "Manipur", id: 21 },
  { code: "ML", name: "Meghalaya", id: 22 },
  { code: "MZ", name: "Mizoram", id: 23 },
  { code: "NL", name: "Nagaland", id: 24 },
  { code: "OR", name: "Odisha", id: 25 },
  { code: "PY", name: "Puducherry", id: 26 },
  { code: "PB", name: "Punjab", id: 27 },
  { code: "RJ", name: "Rajasthan", id: 28 },
  { code: "SK", name: "Sikkim", id: 29 },
  { code: "TN", name: "Tamil Nadu", id: 30 },
  { code: "TS", name: "Telangana", id: 31 },
  { code: "TR", name: "Tripura", id: 32 },
  { code: "UK", name: "Uttarakhand", id: 33 },
  { code: "UP", name: "Uttar Pradesh", id: 34 },
  { code: "WB", name: "West Bengal", id: 35 },
];

const findCity = (state) => {
  switch (state) {
    case "Andhra Pradesh":
      return `https://www.newindianexpress.com/States/Andhra-Pradesh/rssfeed/?id=173&getXmlFeed=true&v=${Date.now()}`;
    case "Delhi":
      return `https://www.newindianexpress.com/Cities/Delhi/rssfeed/?id=340&getXmlFeed=true&v=${Date.now()}`;
    case "Karnataka":
      return `https://www.newindianexpress.com/States/Karnataka/rssfeed/?id=175&getXmlFeed=true&v=${Date.now()}`;
    case "Maharashtra":
      return `https://www.newindianexpress.com/Cities/Mumbai/rssfeed/?id=341&getXmlFeed=true&v=${Date.now()}`;
    case "Odisha":
      return `https://www.newindianexpress.com/States/Odisha/rssfeed/?id=179&getXmlFeed=true&v=${Date.now()}`;
    case "Gujarat":
      return `https://www.newindianexpress.com/Cities/Ahmedabad/rssfeed/?id=343&getXmlFeed=true&v=${Date.now()}`;
    case "Kerala":
      return `https://www.newindianexpress.com/States/Kerala/rssfeed/?id=178&getXmlFeed=true&v=${Date.now()}`;
    case "Tamil Nadu":
      return `https://www.newindianexpress.com/States/Tamil-Nadu/rssfeed/?id=177&getXmlFeed=true&v=${Date.now()}`;
    case "Telangana":
      return `https://www.newindianexpress.com/States/Telangana/rssfeed/?id=174&getXmlFeed=true&v=${Date.now()}`;
    case "West Bengal":
      return `https://www.newindianexpress.com/Cities/Kolkata/rssfeed/?id=342&getXmlFeed=true&v=${Date.now()}`;
    default:
      `https://www.newindianexpress.com/Cities/Mumbai/rssfeed/?id=341&getXmlFeed=true&v=${Date.now()}`;
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
    console.log("statew", req.body.data.state);
    const state = "AP";
    console.warn("sasas", findCity(req.body.data.state));
    Feed.load(
      findCity(req.body.data.state)
        ? findCity(req.body.data.state)
        : `https://www.newindianexpress.com/Cities/Mumbai/rssfeed/?id=341&getXmlFeed=true&v=${Date.now()}`,
      function (err, rss) {
        //console.log("hulala", JSON.stringify(rss, null, 3));
        rss.items.length = 4;
        res.send(rss);
      },
    );
  });

  app.get("/cricketscore", async (req, res) => {
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
