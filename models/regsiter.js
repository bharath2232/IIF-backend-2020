const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const registerShema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  indiaState: {
    type: String,
  },
  codePostal: {
    type: String,
  },
  notificationToken: {
    type: String,
  },
});
const Users = mongoose.model("users", registerShema);
module.exports = Users;
