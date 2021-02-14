const config = require("./db");
const Users = require("./models/regsiter");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Tweets = require("./models/tweets");
const Feed = require("rss-to-json");

module.exports = (app, io) => {
  app.post("/register", async (req, res) => {
    await Users.findOne({ email: req.body.email }).then(async (response) => {
      if (response) {
        res.status(403).json({ error: "Email Already Exists", response });
      }
      if (!response) {
        const newUser = new Users(req.body);
        const result = await newUser.save();
        const authToken = jwt.sign(
          { email: req.body.email, name: req.body.firstName },
          "loginTokenNatsaha",
        );
        res.send({ data: result, status: "SUCCESS", authToken: authToken });
      }
    });
  });

  app.post("/login", async (req, res) => {
    const allUsers = await Users.find({});
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      res.status(404).json({ error: "Empty Username or password" });
    } else {
      const login = await Users.findOne({ email: email }).then((response) => {
        console.log("respose", response);
        if (!response) {
          res.status(404).json({ error: "User Not Fount" });
        }
        if (response.password !== password) {
          res.status(404).json({ error: "Invalid Password" });
        } else {
          const authToken = jwt.sign(
            { email: response.email, name: response.name },
            "loginTokenNatsaha",
          );
          res.status(200).json({
            success: "Login Success",
            authToken: authToken,
            user: response,
          });
        }
      });
    }
  });
  app.get("/", async (req, res) => {
    res.send(
      "Highly Secure Apis V1.1  CI ssdsdsd ss Developed by Bharat Nagandla, For any support please email me@bharath.fr",
    );
  });
  app.get("/users", async (req, res) => {
    const token = req.header("authToken");
    if (!token)
      return res
        .status(401)
        .json({ error: "Access Deniend", txt: "No Token in the header" });
    jwt.verify(token, "loginTokenNatsaha", async (err, decode) => {
      if (err) {
        res.status(401).json({ error: "Invalid Auth Token" });
      }
      if (decode) {
        const allUsers = await Users.find({});
        res.set({ authToken: token, user: decode.email });
        res.send(allUsers);
      }
    });
  });
  app.put("/user/:id", async (req, res) => {
    const token = req.header("authToken");
    if (!token)
      return res
        .status(401)
        .json({ error: "Access Deniend", txt: "No Token in the header" });
    jwt.verify(token, "loginTokenNatsaha", async (err, decode) => {
      if (err) {
        res.status(401).json({ error: "Invalid Auth Token" });
      }
      if (decode) {
        const allUsers = await Users.find({});
        res.set({ authToken: token, user: decode.email });
        res.send(allUsers);
      }
    });
  });

  app.get("/tweets", async (req, res) => {
    const token = req.header("authToken");
    if (!token)
      return res
        .status(401)
        .json({ error: "Access Deniend", txt: "No Token in the header" });
    jwt.verify(token, "loginTokenNatsaha", async (err, decode) => {
      if (err) {
        res.status(401).json({ error: "Invalid Auth Token" });
      }
      if (decode) {
        const allTweets = await Tweets.find({});
        res.set({ authToken: token, user: decode.email });
        res.send(allTweets);
      }
    });
  });
};
