const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3522;
const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
const socketio = require("socket.io");
const io = socketio(server);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
require("./api-routes.js")(app, io);
require("./twitter")(app, io);
require("./chat")(app, io);
require("./News.js")(app, io);

server.listen(port, () => {
  console.log("server is up");
});
