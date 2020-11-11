const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const config = mongoose.connect(
  "mongodb+srv://admin:Ravi.9700@cluster0.uduli.mongodb.net/iif?authSource=admin&replicaSet=atlas-13uosv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
  { useNewUrlParser: true, useUnifiedTopology: true },
);

module.exports = config;
