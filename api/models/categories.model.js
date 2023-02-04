const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const Categories = new Schema({
  title: {
    type: String,
    required: true
  }
})
Categories.pre(
  "save",
  async (data) => {
    console.log(data)
  }
)
module.exports = model("Categories", Categories)