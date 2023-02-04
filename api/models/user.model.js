const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const bcrypt = require('bcrypt')
const User = new Schema({
  login: {type: String, unique: true, required: true},
  password: {type: String, required: true},
})
User.index({login: 1});
User.pre(
  "save",
  async function () {
    const user = this;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hashSync(user.password, salt);
  }
);
module.exports = model("User", User);